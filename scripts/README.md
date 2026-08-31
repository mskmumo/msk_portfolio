# scripts/

## opengraph-image.tsx

The generator for `public/og.png` (the social share card).

It used to live at `src/app/opengraph-image.tsx` as a live route, but
`next/og` pulls Satori and a font parser — about 1.4 MB — into the Worker
bundle, and that weight is paid on every cold start for an image that never
changes. Cloudflare was returning **Error 1102 (Worker exceeded resource
limits)** on cold requests.

The card is now a static file served straight from `public/`.

### Regenerating it

Only needed when `site.positioning`, `proofPoints` or the stack line change.

```bash
cp scripts/opengraph-image.tsx src/app/opengraph-image.tsx
npm run build:next
cp .next/server/app/opengraph-image.body public/og.png
rm src/app/opengraph-image.tsx
npm run build && npm run cf:deploy
```

The headline is derived from `site.positioning`, so it cannot silently go
stale the way the previously hardcoded copy did.
