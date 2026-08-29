# Deployment

Target: **Cloudflare Workers** (`*.workers.dev`).

> **Security note.** An earlier version of this file contained a real Gmail app
> password in plaintext and was committed to a GitHub repository. That
> credential must be treated as compromised — revoke it at
> <https://myaccount.google.com/apppasswords>. Never put a secret in this file;
> secrets belong in `wrangler secret put` or the Cloudflare dashboard.

---

## Why the contact form does not use SMTP

Cloudflare Workers run on a V8 isolate, not Node. There is no `net`, `tls` or
`dgram` module, so **no SMTP library — nodemailer included — can work there**,
with or without `nodejs_compat`. Outbound mail has to go over an HTTP API
called with `fetch`.

The form therefore sends through [Resend](https://resend.com). All provider
logic lives in `src/lib/email.ts`; swapping to SendGrid, Postmark or Cloudflare
Email Service means adding a case there and changing nothing else.

---

## Environment variables

Set these as Worker secrets, not as plaintext vars:

```bash
npx wrangler secret put RESEND_API_KEY
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | **Yes** | Resend API key (`re_…`). Without it the form returns 503 and tells the visitor to email directly. |
| `CONTACT_TO` | No | Where enquiries land. Defaults to `mskmumo@gmail.com`. |
| `CONTACT_FROM` | No | Verified sender, e.g. `Mumo Mwangangi <hello@yourdomain.com>`. Until a domain is verified, leave unset. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for metadata, sitemap, robots and JSON-LD, e.g. `https://mumo.workers.dev`. |

### The `CONTACT_FROM` caveat

With no verified domain, Resend falls back to its test sender
`onboarding@resend.dev`, which **only delivers to the Resend account owner**.

- Enquiry notifications to you: **work immediately**, no domain needed.
- The courtesy confirmation back to the visitor: **skipped**, because it would
  bounce. `canEmailVisitors()` in `src/lib/email.ts` gates this deliberately.

Verify a domain in Resend and set `CONTACT_FROM` to switch confirmations on.

---

## Setup checklist

1. Create a Resend account, generate an API key, and confirm the account email
   is the address you want enquiries to reach.
2. `npx wrangler secret put RESEND_API_KEY`
3. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin.
4. Deploy, then **submit the form once yourself** and confirm the email lands.
5. Optional: verify a sending domain in Resend and set `CONTACT_FROM`.

## Next.js on Workers

A Next.js app does not run on Workers unmodified — it needs an adapter
(`@opennextjs/cloudflare`, or `vinext`, which Cloudflare now recommends). That
is **not yet set up in this repo**: there is no `wrangler.jsonc` and no adapter
dependency. The contact form is now Workers-compatible, but the deployment
pipeline still has to be added.

## If email breaks

Check the Worker logs with `npx wrangler tail`. The route logs the full enquiry
whenever delivery fails, so a lead is recoverable from the tail even if the
email never sends.

Visitors always see a fallback with the direct email and WhatsApp number, and
the floating WhatsApp button does not depend on the API at all.
