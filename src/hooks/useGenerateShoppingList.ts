import { useRecipeStore } from '@/stores/useRecipeStore'
import { useItemTemplateStore } from '@/stores/useItemTemplateStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useListStore } from '@/stores/useListStore'
import { generateShoppingList } from '@/lib/generate-list'
import type { MealPlan } from '@/types/meal-plan'
import type { List } from '@/types/list'

/**
 * Returns a function that generates a shopping list from the given meal plan
 * and saves it to the list store.
 */
export function useGenerateShoppingList() {
  const recipes = useRecipeStore((s) => s.recipes)
  const itemTemplates = useItemTemplateStore((s) => s.itemTemplates)
  const categories = useCategoryStore((s) => s.categories)
  const addList = useListStore((s) => s.addList)
  const lists = useListStore((s) => s.lists)

  function generate(mealPlan: MealPlan): List {
    // Archive any existing active list for this meal plan
    const existingList = lists.find(
      (l) => l.mealPlanId === mealPlan.id && !l.archived && l.type === 'shopping'
    )

    const items = generateShoppingList(mealPlan, recipes, itemTemplates, categories)

    if (existingList) {
      useListStore.getState().replaceItems(existingList.id, items)
      useListStore.getState().updateList(existingList.id, { archived: false })
      return useListStore.getState().getById(existingList.id)!
    }

    return addList({
      name: mealPlan.name ?? `Shopping list`,
      type: 'shopping',
      mealPlanId: mealPlan.id,
      archived: false,
      items,
    })
  }

  return { generate }
}
