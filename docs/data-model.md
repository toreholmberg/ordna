# Data Model

All schemas live in `src/types/`. TypeScript types are **inferred** — never duplicated manually.

## Category (`src/types/category.ts`)

```ts
CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['grocery', 'household', 'home-improvement', 'custom']),
  color: z.string().optional(),    // hex, for visual grouping
  icon: z.string().optional(),     // lucide icon name
  sortOrder: z.number().int(),
})
```

Default categories seeded on first load: Produce, Dairy, Meat, Pantry, Frozen, Household, Other.

## ItemTemplate (`src/types/item-template.ts`)

Reusable item definitions — the "library" of known grocery items.

```ts
ItemTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  categoryId: z.string().uuid().nullable(),
  defaultUnit: z.string().optional(),       // 'g', 'kg', 'stk', 'dl', 'liter'
  defaultQuantity: z.number().optional(),
  recurring: z.boolean().default(false),    // always added to shopping list
  recurrenceRule: z.enum(['weekly', 'biweekly', 'monthly']).optional(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
```

## Recipe (`src/types/recipe.ts`)

```ts
IngredientSchema = z.object({
  id: z.string().uuid(),
  itemTemplateId: z.string().uuid().nullable(), // null = ad-hoc ingredient
  name: z.string().min(1),                      // denormalized for display
  quantity: z.number().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
  sortOrder: z.number().int(),
})

RecipeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
  servings: z.number().int().min(1).default(4),
  prepTimeMinutes: z.number().int().optional(),
  cookTimeMinutes: z.number().int().optional(),
  instructions: z.string().optional(),
  tags: z.array(z.string()),
  sourceUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  ingredients: z.array(IngredientSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
```

## MealPlan (`src/types/meal-plan.ts`)

```ts
MealPlanEntrySchema = z.object({
  id: z.string().uuid(),
  dayOfWeek: z.enum(['monday'...'sunday']),
  mealType: z.enum(['breakfast','lunch','dinner','snack']).default('dinner'),
  recipeId: z.string().uuid().nullable(),   // null = unplanned slot
  servings: z.number().int().optional(),    // overrides recipe default
  notes: z.string().optional(),
})

MealPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  weekStartDate: z.string(),              // ISO YYYY-MM-DD, always Monday
  entries: z.array(MealPlanEntrySchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
```

**Phase 1:** UI only shows dinner slot per day. `mealType` field exists for future expansion.

## List (`src/types/list.ts`)

```ts
ListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  categoryId: z.string().uuid().nullable(),
  checked: z.boolean().default(false),
  sourceType: z.enum(['recipe', 'recurring', 'manual', 'template']),
  sourceRecipeId: z.string().uuid().nullable(),
  sourceMealPlanId: z.string().uuid().nullable(),
  notes: z.string().optional(),
  sortOrder: z.number().int(),
  addedAt: z.string().datetime(),
})

ListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['shopping', 'task', 'home-improvement', 'custom']),
  mealPlanId: z.string().uuid().nullable(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  archived: z.boolean().default(false),
  items: z.array(ListItemSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
```

**Source tracking** on list items is critical for: deduplication when merging recipes, remove-recipe logic (remove all items from a recipe without affecting others).
