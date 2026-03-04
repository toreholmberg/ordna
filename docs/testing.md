# Testing Strategy

## Philosophy

Test what's actually at risk of breaking. Focus on:
1. Complex logic that's hard to verify visually
2. User flows that would break silently

## Unit Tests (Vitest)

**Config:** `vitest.config.ts` — picks up `*.test.ts` and `*.test.tsx` under `src/`.

**Co-located with source:**
```
src/lib/generate-list.ts
src/lib/generate-list.test.ts     ← same directory

src/lib/date.ts
src/lib/date.test.ts
```

**Run:**
```bash
pnpm test          # watch mode
pnpm test:run      # single run (CI)
pnpm test:ui       # Vitest UI
```

### Priority targets

1. **`src/lib/generate-list.test.ts`** — highest priority
   - Deduplication: same itemTemplateId from multiple recipes → merged quantity
   - Recurring item injection
   - Items with no itemTemplateId (ad-hoc) always added separately
   - Category sorting

2. **`src/lib/date.test.ts`**
   - `getMonday()` returns correct Monday for any day
   - `formatWeekLabel()` formats correctly
   - Edge cases: Sunday (belongs to previous week? or current?)

3. Schema validation edge cases (optional)

**Skip unit testing:** Zustand stores, Next.js pages — covered by E2E.

## Component Tests (Vitest + Testing Library)

Co-located, only for non-trivial conditional logic:
- `ShoppingListItem.test.tsx` — checked/unchecked state, check event fires
- `RecipeForm.test.tsx` — validation errors visible on submit

## E2E Tests (Playwright)

**Config:** `playwright.config.ts` — targets `http://localhost:3000`.

**Run:** Use `webapp-testing` skill.

```
e2e/
├── recipe-crud.spec.ts        # add recipe with ingredients, edit name, delete
├── meal-plan-flow.spec.ts     # plan week → generate shopping list → verify items
└── shopping-flow.spec.ts      # check off items, add manual item, persist on refresh
```

E2E tests are the **primary quality gate** — written alongside each major feature.
