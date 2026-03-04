import type { MealPlan } from '@/types/meal-plan'
import type { Recipe } from '@/types/recipe'
import type { ItemTemplate } from '@/types/item-template'
import type { Category } from '@/types/category'
import type { ListItem } from '@/types/list'

/**
 * Pure function: generates a shopping list from a meal plan.
 *
 * Logic:
 * 1. Extract ingredients from each planned recipe entry → sourceType: 'recipe'
 * 2. Deduplicate: same itemTemplateId across recipes → merge quantities
 * 3. Add recurring ItemTemplates → sourceType: 'recurring'
 * 4. Sort by category sortOrder, then item name
 */
export function generateShoppingList(
  mealPlan: MealPlan,
  recipes: Recipe[],
  itemTemplates: ItemTemplate[],
  categories: Category[]
): ListItem[] {
  const now = new Date().toISOString()
  const recipeMap = new Map(recipes.map((r) => [r.id, r]))
  const categoryOrderMap = new Map(categories.map((c) => [c.id, c.sortOrder]))

  // --- Step 1 & 2: extract + deduplicate recipe ingredients ---
  // Key: itemTemplateId for linked items, or ingredient id for ad-hoc
  const mergedItems = new Map<
    string,
    {
      name: string
      quantity: number | undefined
      unit: string | undefined
      categoryId: string | null
      itemTemplateId: string | null
      sourceRecipeIds: string[]
      notes: string | undefined
    }
  >()

  for (const entry of mealPlan.entries) {
    if (!entry.recipeId) continue
    const recipe = recipeMap.get(entry.recipeId)
    if (!recipe) continue

    const servingMultiplier =
      entry.servings != null && recipe.servings > 0
        ? entry.servings / recipe.servings
        : 1

    for (const ingredient of recipe.ingredients) {
      // Ad-hoc ingredients (no itemTemplateId) are always added separately
      if (!ingredient.itemTemplateId) {
        const key = `adhoc-${ingredient.id}`
        mergedItems.set(key, {
          name: ingredient.name,
          quantity:
            ingredient.quantity != null
              ? ingredient.quantity * servingMultiplier
              : undefined,
          unit: ingredient.unit,
          categoryId: null,
          itemTemplateId: null,
          sourceRecipeIds: [entry.recipeId],
          notes: ingredient.notes,
        })
        continue
      }

      const key = ingredient.itemTemplateId
      const template = itemTemplates.find((t) => t.id === ingredient.itemTemplateId)
      const existing = mergedItems.get(key)

      if (existing) {
        // Merge: add quantities if both have them, otherwise keep existing
        if (existing.quantity != null && ingredient.quantity != null) {
          existing.quantity += ingredient.quantity * servingMultiplier
        } else {
          existing.quantity = undefined // Can't merge — unknown quantity
        }
        if (!existing.sourceRecipeIds.includes(entry.recipeId)) {
          existing.sourceRecipeIds.push(entry.recipeId)
        }
      } else {
        mergedItems.set(key, {
          name: ingredient.name,
          quantity:
            ingredient.quantity != null
              ? ingredient.quantity * servingMultiplier
              : undefined,
          unit: ingredient.unit ?? template?.defaultUnit,
          categoryId: template?.categoryId ?? null,
          itemTemplateId: ingredient.itemTemplateId,
          sourceRecipeIds: [entry.recipeId],
          notes: ingredient.notes,
        })
      }
    }
  }

  // --- Step 3: recurring items ---
  const recurringItems = itemTemplates.filter((t) => t.recurring)
  for (const template of recurringItems) {
    // Don't duplicate if already added from a recipe
    if (mergedItems.has(template.id)) continue
    mergedItems.set(`recurring-${template.id}`, {
      name: template.name,
      quantity: template.defaultQuantity,
      unit: template.defaultUnit,
      categoryId: template.categoryId,
      itemTemplateId: template.id,
      sourceRecipeIds: [],
      notes: template.notes,
    })
  }

  // --- Step 4: convert to ListItem[] and sort ---
  const items: ListItem[] = Array.from(mergedItems.values()).map((item, index) => ({
    id: crypto.randomUUID(),
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    categoryId: item.categoryId,
    checked: false,
    sourceType: item.sourceRecipeIds.length > 0 ? 'recipe' : 'recurring',
    sourceRecipeId: item.sourceRecipeIds[0] ?? null,
    sourceMealPlanId: mealPlan.id,
    notes: item.notes,
    sortOrder: index,
    addedAt: now,
  }))

  // Sort by category sortOrder, then by name
  items.sort((a, b) => {
    const aOrder = a.categoryId != null ? (categoryOrderMap.get(a.categoryId) ?? 999) : 999
    const bOrder = b.categoryId != null ? (categoryOrderMap.get(b.categoryId) ?? 999) : 999
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.name.localeCompare(b.name)
  })

  // Re-assign sortOrder after sorting
  items.forEach((item, index) => {
    item.sortOrder = index
  })

  return items
}
