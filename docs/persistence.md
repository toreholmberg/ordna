# Persistence

## Phase 1: localStorage via Zustand persist

All data stored in localStorage. Each store has its own key:

| Store          | Key                    |
| -------------- | ---------------------- |
| Recipes        | `ordna-recipes`        |
| Meal plans     | `ordna-meal-plans`     |
| Lists          | `ordna-lists`          |
| Categories     | `ordna-categories`     |
| Item templates | `ordna-item-templates` |

Data survives page refreshes and browser restarts. Lost if the user clears site data.

### Serialization

Zustand persist serializes to JSON automatically. All `Date` values are stored as ISO strings (`z.string().datetime()`), not `Date` objects — this avoids hydration mismatches.

### Initial Seeding

`useCategoryStore` checks if categories array is empty on first load and seeds defaults (Produce, Dairy, Meat, Pantry, Frozen, Household, Other).

## Phase 2: Supabase

When adding multi-device sync / family sharing:

1. Create Supabase project, mirror Zod schemas as Postgres tables
2. Add Supabase Auth (magic link)
3. Replace localStorage adapter in each Zustand store with Supabase-backed adapter
4. Add TanStack Query for async loading/error states
5. Add Supabase Realtime subscriptions for live updates
6. RLS policies for household-based data isolation

Store interfaces stay identical. Components need no changes.

### Environment Variables (Phase 2)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
