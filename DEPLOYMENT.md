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

A Next.js app does not run on Workers unmodified — it goes through the
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter, which
is now configured in this repo.

```bash
npm run build         # next build + OpenNext bundle into .open-next/
npm run build:next    # plain `next build`, no Worker bundle
npm run cf:preview    # run the built Worker locally in workerd
npm run cf:deploy     # build and deploy
npm run cf:typegen    # regenerate cloudflare-env.d.ts from the bindings
```

### Why `build` is not `next build`

Cloudflare Workers Builds runs `npm run build`, and its deploy step then looks
for `.open-next/.build/open-next.config.edge.mjs`. Plain `next build` never
writes that file, so the deploy fails with:

```
ERROR Could not find compiled Open Next config, did you run the build command?
```

So `build` runs `opennextjs-cloudflare build`. But OpenNext builds Next by
shelling out to `npm run build` itself — which would make that script call
itself forever. `open-next.config.ts` therefore sets:

```ts
config.buildCommand = "npm run build:next";
```

redirecting the inner call at the plain Next build and breaking the loop.
**If you ever repoint `build`, keep that pair consistent or you get either an
infinite build loop or a missing-config deploy failure.**

### The Worker name must match itself

`wrangler.jsonc` sets `name` and a `WORKER_SELF_REFERENCE` service binding.
**These two values must be identical.** OpenNext binds the Worker to itself,
and if the service name does not match the Worker being deployed, the deploy
fails with:

```
Service binding 'WORKER_SELF_REFERENCE' references Worker 'X'
which was not found. [code: 10143]
```

That is what happened when the binding pointed at `mumorealg` (the
`package.json` name) while the Worker in the account is `msk-portfolio`. Both
are now `msk-portfolio`.

If you rename the Worker, change **both** values — and the `workers.dev`
subdomain changes with it, so update `NEXT_PUBLIC_SITE_URL` too.

### Version constraint

`@opennextjs/cloudflare` requires `next >= 15.5.24`. The project was on
15.5.4, which npm rejected as a peer conflict; it is now pinned to `^15.5.24`.
Do not downgrade Next below that while the adapter is in use.

### Verifying before you push

```bash
npm run build
npx wrangler deploy --dry-run
```

The dry run prints the resolved bindings. Confirm it shows
`env.WORKER_SELF_REFERENCE (msk-portfolio)` — matching the Worker name — before
deploying for real.

## If email breaks

Check the Worker logs with `npx wrangler tail`. The route logs the full enquiry
whenever delivery fails, so a lead is recoverable from the tail even if the
email never sends.

Visitors always see a fallback with the direct email and WhatsApp number, and
the floating WhatsApp button does not depend on the API at all.
