import { site } from "@/lib/site";
import type { ContactInput } from "@/lib/validation";

/**
 * Email templates for the contact form.
 *
 * Built with tables and inline styles rather than modern CSS: Outlook and
 * Gmail strip <style> blocks and ignore flexbox and grid, so anything clever
 * degrades into a stack of unstyled text.
 */

/** Values are user input; escape before they touch the HTML. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Brand tokens, mirroring the site palette. */
const C = {
  page: "#f3f1ea",
  card: "#ffffff",
  panel: "#f3f1ea",
  ink: "#101211",
  body: "#4e544f",
  muted: "#7c827c",
  line: "#e4e1d8",
  lineStrong: "#cfcbbf",
  accent: "#0b5d42",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/**
 * Turn whatever the enquirer typed into a wa.me link. Kenyan numbers arrive as
 * +254…, 254… or 07…; all three should end up dialable.
 */
function whatsappLinkFor(phone?: string) {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9) return null;
  const e164 = digits.startsWith("0") ? `254${digits.slice(1)}` : digits;
  return `https://wa.me/${e164}`;
}

/**
 * Renders only the rows that have a value, and drops the rule under whichever
 * one ends up last — every field except email is optional, so "last" cannot be
 * hardcoded without risking a double line against the footer border.
 */
function detailRows(entries: [string, string | undefined][]) {
  const present = entries.filter(([, value]) => Boolean(value));
  return present
    .map(([label, value], i) => {
      const border =
        i === present.length - 1 ? "none" : `1px solid ${C.line}`;
      return `
    <tr>
      <td style="padding:11px 0;border-bottom:${border};vertical-align:top;width:120px;color:${C.muted};font-size:12px;letter-spacing:0.02em;">${escapeHtml(label)}</td>
      <td style="padding:11px 0;border-bottom:${border};color:${C.ink};font-size:14px;line-height:1.5;">${escapeHtml(value as string)}</td>
    </tr>`;
    })
    .join("");
}

function shell(inner: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.page};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};padding:32px 14px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.card};border:1px solid ${C.line};border-radius:14px;overflow:hidden;font-family:${FONT};">
        <tr><td style="height:4px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
        ${inner}
      </table>
      <div style="max-width:600px;margin:16px auto 0;font-family:${FONT};font-size:11px;color:${C.muted};text-align:center;">
        Sent from the contact form at
        <a href="${site.url}" style="color:${C.muted};">${site.url.replace(/^https?:\/\//, "")}</a>
      </div>
    </td></tr>
  </table>
</body></html>`;
}

/** The email that reaches Mumo when someone submits the form. */
export function notificationEmail(data: ContactInput) {
  const name = escapeHtml(data.name);
  const wa = whatsappLinkFor(data.phone);

  const metaBits = [data.organisation, data.referral ? `via ${data.referral}` : ""]
    .filter(Boolean)
    .map((s) => escapeHtml(s as string))
    .join(" &middot; ");

  const actions = `
    <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: your enquiry — ${data.name}`)}"
       style="display:inline-block;background:${C.accent};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 20px;border-radius:999px;margin:0 8px 8px 0;">Reply by email</a>
    ${
      wa
        ? `<a href="${wa}" style="display:inline-block;background:${C.card};color:${C.ink};border:1px solid ${C.lineStrong};text-decoration:none;font-size:14px;font-weight:500;padding:11px 20px;border-radius:999px;margin:0 8px 8px 0;">WhatsApp</a>`
        : ""
    }`;

  const inner = `
    <tr><td style="padding:26px 32px 0;">
      <table role="presentation" width="100%"><tr>
        <td style="font-size:13px;font-weight:600;color:${C.ink};">${escapeHtml(site.name)}</td>
        <td align="right" style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted};">New enquiry</td>
      </tr></table>
    </td></tr>

    <tr><td style="padding:22px 32px 0;">
      <div style="font-size:26px;font-weight:600;color:${C.ink};line-height:1.2;">${name}</div>
      ${metaBits ? `<div style="margin-top:7px;font-size:14px;color:${C.muted};">${metaBits}</div>` : ""}
    </td></tr>

    <tr><td style="padding:22px 32px 0;">
      <table role="presentation" width="100%" style="background:${C.panel};border-radius:10px;">
        <tr><td style="padding:18px 20px;">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted};">What they need</div>
          <div style="margin-top:10px;font-size:15px;line-height:1.65;color:${C.ink};">${escapeHtml(data.message).replace(/\n/g, "<br>")}</div>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:22px 32px 0;">${actions}</td></tr>

    <tr><td style="padding:14px 32px 0;">
      <table role="presentation" width="100%" style="border-collapse:collapse;">
        ${detailRows([
          ["Needs", data.projectType],
          ["Budget", data.budget],
          ["Timeline", data.timeline],
          ["Email", data.email],
          ["Phone", data.phone],
        ])}
      </table>
    </td></tr>

    <tr><td style="padding:22px 32px 28px;">
      <div style="border-top:1px solid ${C.line};padding-top:16px;font-size:12px;line-height:1.7;color:${C.muted};">
        Replying to this email answers ${name} directly.
      </div>
    </td></tr>`;

  const subject = `Enquiry — ${data.name}${data.organisation ? ` (${data.organisation})` : ""}${data.projectType ? ` · ${data.projectType}` : ""}`;

  const text = [
    `NEW ENQUIRY — ${data.name}`,
    data.organisation && `Organisation: ${data.organisation}`,
    "",
    "What they need:",
    data.message,
    "",
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.projectType && `Needs: ${data.projectType}`,
    data.budget && `Budget: ${data.budget}`,
    data.timeline && `Timeline: ${data.timeline}`,
    data.referral && `Found via: ${data.referral}`,
    "",
    `Reply to this email to answer ${data.name} directly.`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html: shell(inner), text };
}

/** The courtesy acknowledgement sent back to the enquirer. */
export function confirmationEmail(name: string) {
  const safeName = escapeHtml(name);

  const inner = `
    <tr><td style="padding:26px 32px 0;">
      <div style="font-size:13px;font-weight:600;color:${C.ink};">${escapeHtml(site.name)}</div>
      <div style="margin-top:4px;font-size:12px;color:${C.muted};">${escapeHtml(site.role)} &middot; ${escapeHtml(site.location)}</div>
    </td></tr>

    <tr><td style="padding:24px 32px 0;">
      <div style="font-size:22px;font-weight:600;color:${C.ink};line-height:1.3;">Thanks — your message reached me.</div>
      <div style="margin-top:14px;font-size:15px;line-height:1.7;color:${C.body};">
        Hi ${safeName},<br><br>
        I read every enquiry myself, so this is not an autoresponder pretending
        otherwise — it is just confirmation that nothing got lost. You will hear
        back from me within two working days.
      </div>
    </td></tr>

    <tr><td style="padding:22px 32px 0;">
      <table role="presentation" width="100%" style="background:${C.panel};border-radius:10px;">
        <tr><td style="padding:18px 20px;font-size:14px;line-height:1.65;color:${C.body};">
          If it is urgent, WhatsApp is faster than email:
          <a href="https://wa.me/${site.whatsapp}" style="color:${C.accent};font-weight:500;text-decoration:none;">${escapeHtml(site.phone)}</a>
        </td></tr>
      </table>
    </td></tr>

    <tr><td style="padding:22px 32px 0;">
      <a href="${site.url}/work" style="display:inline-block;background:${C.accent};color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;padding:12px 20px;border-radius:999px;">See recent work</a>
    </td></tr>

    <tr><td style="padding:26px 32px 28px;">
      <div style="border-top:1px solid ${C.line};padding-top:16px;font-size:12px;line-height:1.7;color:${C.muted};">
        ${escapeHtml(site.name)} &middot; ${escapeHtml(site.role)}<br>
        <a href="${site.url}" style="color:${C.muted};">${site.url.replace(/^https?:\/\//, "")}</a>
      </div>
    </td></tr>`;

  const text = `Hi ${name},

Thanks — your message reached me. I read every enquiry myself, so this is just
confirmation that nothing got lost. You will hear back within two working days.

If it is urgent, WhatsApp is faster: ${site.phone}

${site.name}
${site.role} · ${site.location}
${site.url}`;

  return {
    subject: `Thanks for getting in touch — ${site.name}`,
    html: shell(inner),
    text,
  };
}
