# Decision Log

## 2026-03-04 Decision: ESLint 9 + Prettier 3 as code quality baseline

**Context:** No linting, formatting, or CI was configured. Needed a `pnpm lint` command usable both locally and in CI.
**Decision:**

- **ESLint 9** (flat config, `eslint.config.mjs`) extending `eslint-config-next` — covers React hooks, Next.js rules, accessibility, and TypeScript. `eslint-config-prettier` disables any formatting rules that would conflict with Prettier.
- **Prettier 3** with `prettier-plugin-tailwindcss` — enforces consistent formatting and auto-sorts Tailwind class names. `src/components/ui/` excluded via `.prettierignore` (read-only shadcn files).
- **`pnpm lint`** runs `eslint . && tsc --noEmit` — one command covers both static analysis and type checking.
- **GitHub Actions CI** — two parallel jobs: lint+typecheck and unit tests. E2E excluded from CI (needs live browser).
- **ESLint 10 skipped** — `eslint-plugin-react@7` is not compatible with ESLint 10 at the time of setup.
  **Alternatives considered:** Biome (fast but immature Next.js support); oxlint (no TypeScript type-aware rules yet).
  **Consequences:** All existing code was formatted in the initial Prettier pass. Tailwind class order in source files changed to canonical order (no behavioural impact).

---

## 2026-03-03 Decision: Turbopack config workaround for next-pwa

**Context:** Next.js 16 enables Turbopack by default. `@ducanh2912/next-pwa` injects webpack config, causing a build error.
**Decision:** Add `turbopack: {}` to `nextConfig` to acknowledge the Turbopack usage and suppress the error. The PWA manifest is still served correctly; the service worker generation via webpack is bypassed in Turbopack builds. For production, the service worker generated at build time by the webpack path won't run — the manifest.json still works for installability.
**Alternatives considered:** Use `--webpack` flag (forces webpack, loses Turbopack speed); wait for next-pwa Turbopack support.
**Consequences:** App installs as PWA (manifest works), but no offline caching via service worker in Phase 1. This is acceptable — service worker adds caching, not core functionality.

Append-only. Newest at top.

---

## 2026-03-03 Decision: Use @ducanh2912/next-pwa instead of next-pwa

**Context:** Setting up PWA support for Next.js 15+.
**Decision:** Use `@ducanh2912/next-pwa` — the actively maintained fork of `next-pwa`, compatible with Next.js 15+ and App Router.
**Alternatives considered:** `next-pwa` (unmaintained), manual service worker.
**Consequences:** Slightly different config API than original `next-pwa`. Well-documented, active community.

---

## 2026-03-03 Decision: Next.js 16 (auto-installed latest)

**Context:** Running `pnpm create next-app@latest` installed Next.js 16.1.6.
**Decision:** Accept Next.js 16 — it's backwards-compatible with Next.js 15 App Router patterns. All architectural decisions in the plan still apply.
**Alternatives considered:** Pin to Next.js 15.
**Consequences:** Using latest stable, which is fine for a new project.

---

## 2026-03-03 Decision: Next.js App Router over plain Vite + React

**Context:** Choosing framework for mobile-first PWA targeting Vercel deployment.
**Decision:** Next.js App Router — Vercel's own framework, deep integration, App Router nested layouts ideal for mobile nav, file-based routing predictable for AI-maintained codebase, API routes cover Phase 2 backend needs without separate server.
**Alternatives considered:** Vite + React (simpler, but no SSR, less Vercel integration), Remix (good but less Vercel-native).
**Consequences:** Slightly heavier than Vite for a pure SPA, but worth it for deployment ergonomics and Phase 2 readiness.

---

## 2026-03-03 Decision: Zod v4

**Context:** Installing Zod for schema validation and type inference.
**Decision:** Use Zod v4 (installed as `zod@4.x`) — latest major version with improved performance and API.
**Alternatives considered:** Zod v3 (well-established but older).
**Consequences:** Some API differences from v3. Specifically: `z.string().datetime()` behavior and import paths. All schemas use v4 API.
