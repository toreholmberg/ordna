# Routing

## Route Structure

```
src/app/
├── layout.tsx                    # Root layout: fonts, metadata, PWA
├── globals.css
└── (app)/                        # Route group: all share bottom nav
    ├── layout.tsx                # Bottom nav + page container
    ├── page.tsx                  # Redirect → /lists
    ├── lists/
    │   ├── page.tsx              # Active shopping list (or list of lists)
    │   └── [id]/page.tsx         # Specific list view
    ├── meal-plan/
    │   ├── page.tsx              # Current week
    │   └── [id]/page.tsx         # Specific meal plan
    ├── recipes/
    │   ├── page.tsx              # Recipe library
    │   ├── new/page.tsx          # Add recipe form
    │   └── [id]/
    │       ├── page.tsx          # Recipe detail
    │       └── edit/page.tsx     # Edit recipe form
    └── settings/
        └── page.tsx              # Categories + recurring items
```

## Bottom Navigation

4 tabs (persistent via `(app)/layout.tsx`):

| Tab       | Route        | Icon        |
| --------- | ------------ | ----------- |
| Lists     | `/lists`     | ShoppingBag |
| Meal Plan | `/meal-plan` | Calendar    |
| Recipes   | `/recipes`   | BookOpen    |
| Settings  | `/settings`  | Settings    |

## Navigation Rules

- Bottom nav persists across all `(app)` routes
- Deep links (recipe detail, list detail) keep bottom nav visible
- No top header — mobile-first, max vertical space
- `(app)/page.tsx` redirects to `/lists`

## Link Patterns

```tsx
// Navigate to recipe detail
<Link href={`/recipes/${recipe.id}`}>

// Navigate to edit
<Link href={`/recipes/${recipe.id}/edit`}>

// Navigate to list
<Link href={`/lists/${list.id}`}>
```
