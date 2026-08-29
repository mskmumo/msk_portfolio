import { NextRequest, NextResponse } from "next/server";
import { contactSchema, type ContactInput } from "@/lib/validation";
import {
  canEmailVisitors,
  isEmailConfigured,
  notificationRecipient,
  sendEmail,
} from "@/lib/email";
import { site } from "@/lib/site";

/**
 * Submitted values are user input. They were previously interpolated straight
 * into the notification email's HTML, which let a submitter put markup and
 * links into the inbox this form reports to.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const FALLBACK = `Please email ${site.email} or WhatsApp ${site.phone} directly.`;

function row(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e4e1d8;vertical-align:top;width:150px;color:#7c827c;font-size:13px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e4e1d8;color:#101211;font-size:14px;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
    </tr>`;
}

function notificationEmail(data: ContactInput) {
  return {
    subject: `Enquiry — ${data.name}${data.organisation ? ` (${data.organisation})` : ""}${data.projectType ? ` · ${data.projectType}` : ""}`,
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#fbfaf7;padding:32px;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e4e1d8;border-radius:12px;padding:32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7c827c;">New enquiry</p>
          <h1 style="margin:0 0 24px;font-size:22px;color:#101211;font-weight:600;">${escapeHtml(data.name)}</h1>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Email", data.email)}
            ${row("Organisation", data.organisation)}
            ${row("Phone", data.phone)}
            ${row("Needs", data.projectType)}
            ${row("Budget", data.budget)}
            ${row("Timeline", data.timeline)}
            ${row("Found via", data.referral)}
            ${row("Problem", data.message)}
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#7c827c;">
            Reply to this email to answer ${escapeHtml(data.name)} directly.
          </p>
        </div>
      </div>`,
    text: [
      `New enquiry — ${data.name}`,
      `Email: ${data.email}`,
      data.organisation && `Organisation: ${data.organisation}`,
      data.phone && `Phone: ${data.phone}`,
      data.projectType && `Needs: ${data.projectType}`,
      data.budget && `Budget: ${data.budget}`,
      data.timeline && `Timeline: ${data.timeline}`,
      data.referral && `Found via: ${data.referral}`,
      "",
      "Problem:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

function confirmationEmail(name: string) {
  const safeName = escapeHtml(name);
  return {
    subject: "Got your message — Mumo Mwangangi",
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#fbfaf7;padding:32px;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e1d8;border-radius:12px;padding:32px;color:#101211;">
          <p style="margin:0 0 20px;font-size:15px;">Hi ${safeName},</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4e544f;">
            Thanks for getting in touch. Your message has reached me and I read
            every enquiry myself — you will hear back within two working days.
          </p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4e544f;">
            If it is urgent, WhatsApp is faster:
            <a href="https://wa.me/${site.whatsapp}" style="color:#0b5d42;">${site.phone}</a>.
          </p>
          <p style="margin:24px 0 0;font-size:15px;">
            Mumo Mwangangi<br>
            <span style="color:#7c827c;font-size:13px;">${site.role} · ${site.location}</span>
          </p>
        </div>
      </div>`,
    text: `Hi ${name},

Thanks for getting in touch. Your message has reached me and I read every enquiry myself — you will hear back within two working days.

If it is urgent, WhatsApp is faster: ${site.phone}

Mumo Mwangangi
${site.role} · ${site.location}`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Some fields were not accepted. Please check and try again." },
        { status: 400 },
      );
    }

    // Honeypot: accept silently so the bot does not learn it was caught.
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    if (!isEmailConfigured()) {
      // Log the enquiry so it is at least recoverable from the Worker tail.
      console.error("RESEND_API_KEY is not set — enquiry not delivered:", {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      });
      return NextResponse.json(
        { error: `The contact form is temporarily unavailable. ${FALLBACK}` },
        { status: 503 },
      );
    }

    const notification = notificationEmail(parsed.data);
    const delivered = await sendEmail({
      to: notificationRecipient(),
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      replyTo: parsed.data.email,
    });

    if (!delivered.ok) {
      console.error("Enquiry delivery failed:", delivered, {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      });
      return NextResponse.json(
        { error: `That did not send. ${FALLBACK}` },
        { status: 502 },
      );
    }

    // Courtesy confirmation. Skipped when only the provider's test sender is
    // available, since that cannot deliver to anyone but the account owner.
    // Never fails the request — the enquiry has already arrived.
    if (canEmailVisitors()) {
      const confirmation = confirmationEmail(parsed.data.name);
      const ack = await sendEmail({
        to: parsed.data.email,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
        replyTo: site.email,
      });
      if (!ack.ok) {
        console.error("Confirmation email failed (enquiry was delivered):", ack);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: `That did not send. ${FALLBACK}` },
      { status: 500 },
    );
  }
}
