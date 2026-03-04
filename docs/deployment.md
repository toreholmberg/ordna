# Deployment

## Platform: Vercel

### Setup
1. Push repo to GitHub
2. Connect GitHub repo to Vercel project
3. Automatic: preview deploy on every PR, production on merge to `main`
4. Initial domain: `ordna.vercel.app`

### Phase 1 (static PWA)
- `next build` output is fully static — no server required
- Vercel serves from CDN globally
- PWA manifest + service worker via `@ducanh2912/next-pwa`

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
pnpm build          # production build
pnpm start          # serve production build locally
pnpm dev            # development server (localhost:3000)
```

## PWA Configuration

`next.config.ts` wraps the Next.js config with `withPWA`:
- Service worker registered at root
- Manifest at `public/manifest.json`
- Icons at `public/icons/` (192×192 and 512×512 PNG)
- Cache strategy: network-first for API routes, cache-first for static assets
