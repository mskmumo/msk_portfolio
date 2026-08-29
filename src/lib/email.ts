/**
 * Email delivery over HTTP.
 *
 * The contact form previously used nodemailer against Gmail SMTP. That cannot
 * run on Cloudflare Workers: the runtime is a V8 isolate with no `net`, `tls`
 * or `dgram`, so every SMTP library fails at the transport layer regardless of
 * nodejs_compat. Outbound mail therefore has to go through an HTTP API called
 * with `fetch`, which works identically on Workers, Vercel and Node.
 *
 * Resend is the default because it is a single POST. Swap providers by adding
 * a case to `deliver()` — nothing outside this file needs to change.
 */

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "provider_error"; detail?: string };

/** Fallback sender. Resend only delivers from this to the account owner. */
const RESEND_TEST_SENDER = "onboarding@resend.dev";

function apiKey() {
  return process.env.RESEND_API_KEY?.trim();
}

/** Where enquiry notifications land. */
export function notificationRecipient() {
  return process.env.CONTACT_TO?.trim() || "mskmumo@gmail.com";
}

/**
 * The From address. Resend requires a verified domain for anything other than
 * its test sender, so this stays unset until a domain exists.
 */
export function sender() {
  return process.env.CONTACT_FROM?.trim() || RESEND_TEST_SENDER;
}

/**
 * Whether a visitor-facing confirmation can actually be delivered.
 *
 * With the test sender Resend will only deliver to the account owner, so a
 * confirmation to the visitor is guaranteed to bounce. Better to skip it than
 * to burn a request on a send that cannot succeed.
 */
export function canEmailVisitors() {
  return Boolean(apiKey()) && sender() !== RESEND_TEST_SENDER;
}

export function isEmailConfigured() {
  return Boolean(apiKey());
}

export async function sendEmail(message: EmailMessage): Promise<SendResult> {
  const key = apiKey();
  if (!key) return { ok: false, reason: "unconfigured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender(),
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        // Resend's REST API is snake_case; the camelCase form is SDK-only.
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });

    if (response.ok) return { ok: true };

    const detail = await response.text().catch(() => "");
    return {
      ok: false,
      reason: "provider_error",
      detail: `${response.status} ${detail}`.trim(),
    };
  } catch (error) {
    return {
      ok: false,
      reason: "provider_error",
      detail: error instanceof Error ? error.message : "unknown transport error",
    };
  }
}
