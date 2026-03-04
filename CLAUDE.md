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
