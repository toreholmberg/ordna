# Ordna

A mobile-first PWA for grocery list management and meal planning. Plan your week, build your shopping list automatically, and track recurring staples — all stored locally in your browser.

## Features

- **Recipe library** — add and browse recipes with ingredients, cook time, and tags
- **Weekly meal plan** — assign recipes to days and meal types
- **Shopping list generation** — one tap turns your meal plan into a sorted, categorised shopping list
- **Recurring items** — staples like milk and bread are added to every list automatically
- **Categories** — colour-coded grocery categories with custom ordering
- **PWA** — installable, works offline

## Stack

| Concern    | Tool                             |
| ---------- | -------------------------------- |
| Framework  | Next.js 16 (App Router)          |
| Language   | TypeScript (strict)              |
| Styling    | Tailwind CSS v4 + shadcn/ui      |
| State      | Zustand 5 + localStorage persist |
| Schemas    | Zod 4                            |
| Forms      | React Hook Form 7                |
| Tests      | Vitest + Playwright              |
| Deployment | Vercel                           |

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/lists`.

Use the wrench button (bottom-right) to seed mock data on first run.

## Scripts

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build
pnpm lint         # ESLint + tsc --noEmit
pnpm format       # Prettier --write
pnpm format:check # Prettier check (used in CI)
pnpm test:run     # Vitest unit tests
pnpm test:e2e     # Playwright end-to-end tests
```

## Project Structure

```
src/
├── app/(app)/          # All app routes (meal-plan, recipes, lists, settings)
├── components/app/     # Feature components
├── components/ui/      # shadcn/ui (read-only)
├── stores/             # Zustand stores with localStorage persistence
├── types/              # Zod schemas — source of truth for all types
├── lib/                # Pure utility functions (list generation, seed data)
└── hooks/              # Shared custom hooks
docs/                   # Architecture and decision docs
e2e/                    # Playwright tests
```

## Docs

- [Architecture](docs/architecture.md)
- [Data model](docs/data-model.md)
- [State management](docs/state-management.md)
- [Routing](docs/routing.md)
- [Testing](docs/testing.md)
- [Deployment](docs/deployment.md)
- [Decision log](docs/decisions.md)

## Status

**Phase 1 — Local PWA.** All data lives in localStorage. No auth, no backend.

Phase 2 will add Supabase auth + Postgres, family sharing, and real-time sync.
