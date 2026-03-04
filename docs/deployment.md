# Deployment

## Platform: Vercel

### Current state

- Project: `tore-holmbergs-projects/ordna`
- Production URL: https://ordna-theta.vercel.app
- Deployed via Vercel CLI (`vercel --yes`) — first deploy 2026-03-03
- GitHub repo connected — every push to `main` triggers a production deploy, PRs get preview deploys.

### Phase 1 (static PWA)

- `next build` output is fully static — no server required
- Vercel serves from CDN globally
- PWA manifest + service worker via `@ducanh2912/next-pwa`
- Manual deploys: `vercel --prod` from the repo root

### Phase 2 (with Supabase)

- Next.js API routes handle: auth callbacks, webhooks
- Supabase env vars added in Vercel dashboard
- No separate server — Next.js + Vercel handles everything

## Environment Strategy

```
.env.local           # local dev only (gitignored)
Vercel dashboard     # preview + production env vars
```

## Build Commands

```bash
pnpm dev            # development server (localhost:3000)
pnpm build          # production build
pnpm start          # serve production build locally
vercel --prod       # manual production deploy via CLI
```

## PWA Configuration

`next.config.ts` wraps the Next.js config with `withPWA`:

- Service worker registered at root
- Manifest at `public/manifest.json`
- Icons at `public/icons/` (192×192 and 512×512 PNG)
- Cache strategy: network-first for API routes, cache-first for static assets
