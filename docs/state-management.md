# State Management

## Pattern

Each store follows this structure:

```ts
interface StoreState {
  // Data
  items: Item[]
  // Actions
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  deleteItem: (id: string) => void
  // Selectors
  getById: (id: string) => Item | undefined
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({ ... }),
    { name: 'ordna-key' }  // localStorage key
  )
)
```

## Stores

| Store | localStorage key | Responsibility |
|---|---|---|
| `useRecipeStore` | `ordna-recipes` | Recipe CRUD |
| `useMealPlanStore` | `ordna-meal-plans` | Meal plan CRUD, current week resolution |
| `useListStore` | `ordna-lists` | Shopping list CRUD, check-off, archive |
| `useCategoryStore` | `ordna-categories` | Category CRUD, default seeding |
| `useItemTemplateStore` | `ordna-item-templates` | Item template CRUD, recurring items |

## Rules

- **Flat stores** — no nested Zustand store calls inside actions
- Stores may read other stores' state via `useStore.getState()` but never import actions from each other
- IDs generated with `crypto.randomUUID()`
- `createdAt`/`updatedAt` managed by store actions, not by components

## Phase 2 Migration

Replace the `persist` storage option with a custom Supabase adapter:

```ts
// Phase 2: swap storage backend
persist(
  (set, get) => ({ ... }),
  {
    name: 'ordna-recipes',
    storage: createSupabaseStorage(),  // custom adapter
  }
)
```

Store interfaces stay identical — zero component changes required.
