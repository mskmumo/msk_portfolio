import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import {
  canEmailVisitors,
  isEmailConfigured,
  notificationRecipient,
  sendEmail,
} from "@/lib/email";
import { confirmationEmail, notificationEmail } from "@/lib/emails";
import { site } from "@/lib/site";

const FALLBACK = `Please email ${site.email} or WhatsApp ${site.phone} directly.`;

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
