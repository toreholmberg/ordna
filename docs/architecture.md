# Architecture Overview

## Stack

| Concern       | Tool                     | Version     |
| ------------- | ------------------------ | ----------- |
| Framework     | Next.js (App Router)     | 16.x        |
| Language      | TypeScript               | strict mode |
| Styling       | Tailwind CSS             | v4          |
| UI Components | shadcn/ui                | latest      |
| State         | Zustand + persist        | 5.x         |
| Data schemas  | Zod                      | 4.x         |
| Forms         | React Hook Form + Zod    | 7.x         |
| Unit tests    | Vitest + Testing Library | 4.x         |
| E2E tests     | Playwright               | 1.x         |
| Deployment    | Vercel                   | —           |
| PWA           | @ducanh2912/next-pwa     | 10.x        |

## How the Pieces Connect

```
User interaction
    ↓
Next.js page (src/app/(app)/*/page.tsx)
    ↓
React components (src/components/app/**)
    ↓
Zustand stores (src/stores/*) ←→ localStorage (persist)
    ↑
Zod schemas (src/types/*) — source of truth for all types
```

## Key Directories

- `src/app/` — Next.js App Router pages and layouts
- `src/app/(app)/` — Route group: all app routes share bottom nav layout
- `src/components/ui/` — shadcn/ui components (READ ONLY)
- `src/components/app/` — application-specific components
- `src/stores/` — Zustand stores with localStorage persistence
- `src/types/` — Zod schemas (TypeScript types inferred from these)
- `src/lib/` — Pure utility functions and business logic
- `src/hooks/` — Shared custom hooks (used in 2+ components)
- `e2e/` — Playwright end-to-end tests

## Data Flow: Shopping List Generation

1. `useMealPlanStore` holds the current week's meal plan entries
2. `useRecipeStore` holds recipe + ingredient data
3. `useItemTemplateStore` holds item templates (including recurring items)
4. `src/lib/generate-list.ts` (pure function) combines all three → `ListItem[]`
5. `useGenerateShoppingList` hook wraps this, reading from stores
6. Result written to `useListStore` as a new List

## Phase 2 Migration Path

When adding Supabase:

- Replace Zustand `persist` storage adapter with Supabase-backed calls
- Store interfaces stay the same — components don't change
- Add TanStack Query for async state + loading/error handling
- See `docs/persistence.md` for details
