# Ordna — Claude Code Orientation

## Current Phase: Phase 1 — Local PWA

All data in localStorage via Zustand persist. No auth, no backend.

**In scope:** recipe library, weekly meal plan, shopping list generation, ad-hoc items, recurring items, categories, settings.
**Out of scope:** auth, Supabase, real-time sync, AI features, task management.

---

## Quick-Reference Conventions

- **TypeScript strict** — `noImplicitAny: true`, no `any` escapes
- **Zod as source of truth** — all types are `z.infer<typeof Schema>`, never hand-written interfaces
- **One component per file** — filename matches component name (`RecipeCard.tsx` exports `RecipeCard`)
- **Named exports only** — no default exports except Next.js page files (required by framework)
- **Co-located hooks/tests** — live next to primary consumer; move to `src/hooks/` only if used in 2+ places
- **shadcn/ui is read-only** — NEVER modify files in `src/components/ui/`
- **Stores are flat** — no nested Zustand store calls; stores may read each other's state but never import actions from each other

---

## Git Workflow

- **Never commit directly to `main`** — always work on a feature branch
- **Branch naming:** `type/short-description` (e.g. `feat/recipe-search`, `fix/e2e-selectors`, `docs/deployment`)
- **Open a draft PR** for every branch — use `gh pr create --draft`
- **Conventional commits** — format: `type(scope): description` (feat, fix, docs, refactor, test, chore…)
- **Merge via GitHub** — do not `git merge` locally into main; let GitHub merge the PR

---

## Code Quality

All three checks must pass before committing. CI enforces the same commands.

```bash
pnpm lint          # ESLint (next/core-web-vitals) + tsc --noEmit
pnpm format:check  # Prettier formatting check
pnpm test:run      # Vitest unit tests (single run)
```

Fix helpers:

```bash
pnpm lint:fix   # auto-fix ESLint issues
pnpm format     # auto-format with Prettier
pnpm typecheck  # TypeScript only (no ESLint)
```

### Rules

- **No lint errors** — ESLint config extends `next/core-web-vitals`; rules cover React hooks, Next.js best practices, accessibility, and imports
- **No type errors** — `strict: true`, no `any`, no `@ts-ignore` without a comment explaining why
- **Prettier is the formatter** — never hand-format; let Prettier decide. Config: single quotes, no semicolons, 100-char print width, `es5` trailing commas
- **Tailwind class order** — `prettier-plugin-tailwindcss` sorts classes automatically; do not reorder manually
- **`src/components/ui/` is excluded from Prettier** — those files are shadcn/ui read-only (see above)

---

## Architecture Docs

Always update the relevant doc when making architectural changes. Append to `decisions.md` for any architectural decisions.

- [Architecture overview](docs/architecture.md)
- [Data model (Zod schemas)](docs/data-model.md)
- [State management (Zustand)](docs/state-management.md)
- [Routing](docs/routing.md)
- [Styling conventions](docs/styling.md)
- [Testing strategy](docs/testing.md)
- [Persistence (Phase 1 → Phase 2)](docs/persistence.md)
- [Deployment (Vercel)](docs/deployment.md)
- [Decision log](docs/decisions.md)
