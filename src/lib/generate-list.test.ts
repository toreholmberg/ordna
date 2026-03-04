import { describe, it, expect, beforeEach } from 'vitest'
import { generateShoppingList } from './generate-list'
import type { MealPlan } from '@/types/meal-plan'
import type { Recipe } from '@/types/recipe'
import type { ItemTemplate } from '@/types/item-template'
import type { Category } from '@/types/category'

// --- Fixtures ---

const now = new Date().toISOString()

const cat1: Category = { id: 'cat-produce', name: 'Produce', type: 'grocery', sortOrder: 0 }
const cat2: Category = { id: 'cat-dairy', name: 'Dairy', type: 'grocery', sortOrder: 1 }
const cat3: Category = { id: 'cat-other', name: 'Other', type: 'custom', sortOrder: 99 }

const template1: ItemTemplate = {
  id: 'tpl-onion',
  name: 'Onion',
  categoryId: 'cat-produce',
  defaultUnit: 'stk',
  recurring: false,
  createdAt: now,
  updatedAt: now,
}

const template2: ItemTemplate = {
  id: 'tpl-milk',
  name: 'Milk',
  categoryId: 'cat-dairy',
  defaultUnit: 'liter',
  recurring: false,
  createdAt: now,
  updatedAt: now,
}

const templateRecurring: ItemTemplate = {
  id: 'tpl-eggs',
  name: 'Eggs',
  categoryId: 'cat-dairy',
  defaultUnit: 'stk',
  recurring: true,
  recurrenceRule: 'weekly',
  createdAt: now,
  updatedAt: now,
}

const recipe1: Recipe = {
  id: 'rec-pasta',
  name: 'Pasta',
  servings: 4,
  tags: [],
  ingredients: [
    {
      id: 'i1',
      name: 'Onion',
      itemTemplateId: 'tpl-onion',
      quantity: 2,
      unit: 'stk',
      sortOrder: 0,
    },
    {
      id: 'i2',
      name: 'Milk',
      itemTemplateId: 'tpl-milk',
      quantity: 1,
      unit: 'liter',
      sortOrder: 1,
    },
  ],
  createdAt: now,
  updatedAt: now,
}

const recipe2: Recipe = {
  id: 'rec-soup',
  name: 'Soup',
  servings: 4,
  tags: [],
  ingredients: [
    {
      id: 'i3',
      name: 'Onion',
      itemTemplateId: 'tpl-onion',
      quantity: 3,
      unit: 'stk',
      sortOrder: 0,
    },
  ],
  createdAt: now,
  updatedAt: now,
}

const mealPlan: MealPlan = {
  id: 'plan-1',
  weekStartDate: '2026-03-02',
  entries: [
    { id: 'e1', dayOfWeek: 'monday', mealType: 'dinner', recipeId: 'rec-pasta' },
    { id: 'e2', dayOfWeek: 'tuesday', mealType: 'dinner', recipeId: 'rec-soup' },
  ],
  createdAt: now,
  updatedAt: now,
}

// ---

describe('generateShoppingList', () => {
  it('includes ingredients from all planned recipes', () => {
    const items = generateShoppingList(
      mealPlan,
      [recipe1, recipe2],
      [template1, template2],
      [cat1, cat2, cat3]
    )
    const names = items.map((i) => i.name)
    expect(names).toContain('Onion')
    expect(names).toContain('Milk')
  })

  it('deduplicates ingredients with same itemTemplateId and merges quantities', () => {
    const items = generateShoppingList(
      mealPlan,
      [recipe1, recipe2],
      [template1, template2],
      [cat1, cat2, cat3]
    )
    const onions = items.filter((i) => i.name === 'Onion')
    expect(onions).toHaveLength(1)
    expect(onions[0].quantity).toBe(5) // 2 + 3
  })

  it('includes recurring items that are not in any recipe', () => {
    const items = generateShoppingList(
      mealPlan,
      [recipe1],
      [template1, template2, templateRecurring],
      [cat1, cat2, cat3]
    )
    const eggs = items.find((i) => i.name === 'Eggs')
    expect(eggs).toBeDefined()
    expect(eggs?.sourceType).toBe('recurring')
  })

  it('does not duplicate recurring items already in a recipe', () => {
    // templateRecurring has id 'tpl-eggs', not in any recipe — so it gets added once
    const items = generateShoppingList(
      mealPlan,
      [recipe1, recipe2],
      [template1, template2, templateRecurring],
      [cat1, cat2, cat3]
    )
    const eggs = items.filter((i) => i.name === 'Eggs')
    expect(eggs).toHaveLength(1)
  })

  it('marks recipe items with sourceType recipe', () => {
    const items = generateShoppingList(mealPlan, [recipe1], [template1], [cat1, cat2])
    const onion = items.find((i) => i.name === 'Onion')
    expect(onion?.sourceType).toBe('recipe')
    expect(onion?.sourceMealPlanId).toBe('plan-1')
  })

  it('adds ad-hoc ingredients (no itemTemplateId) without deduplication', () => {
    const recipeWithAdhoc: Recipe = {
      ...recipe1,
      ingredients: [
        { id: 'i-adhoc-1', name: 'Secret spice', itemTemplateId: null, sortOrder: 0 },
        { id: 'i-adhoc-2', name: 'Secret spice', itemTemplateId: null, sortOrder: 1 },
      ],
    }
    const items = generateShoppingList(
      {
        ...mealPlan,
        entries: [
          { id: 'e1', dayOfWeek: 'monday', mealType: 'dinner', recipeId: recipeWithAdhoc.id },
        ],
      },
      [recipeWithAdhoc],
      [],
      []
    )
    // Both ad-hoc items should appear (no dedup since no itemTemplateId)
    const spices = items.filter((i) => i.name === 'Secret spice')
    expect(spices).toHaveLength(2)
  })

  it('scales quantities by servings override', () => {
    const mealPlanWithServings: MealPlan = {
      ...mealPlan,
      entries: [
        { id: 'e1', dayOfWeek: 'monday', mealType: 'dinner', recipeId: 'rec-pasta', servings: 8 },
      ],
    }
    const items = generateShoppingList(
      mealPlanWithServings,
      [recipe1],
      [template1, template2],
      [cat1, cat2]
    )
    const onion = items.find((i) => i.name === 'Onion')
    // recipe has 4 servings, override is 8 → multiplier 2 → 2 * 2 = 4
    expect(onion?.quantity).toBe(4)
  })

  it('returns empty array for empty meal plan', () => {
    const emptyPlan: MealPlan = { ...mealPlan, entries: [] }
    const items = generateShoppingList(emptyPlan, [recipe1], [], [])
    expect(items).toHaveLength(0)
  })

  it('sorts items by category sortOrder', () => {
    const items = generateShoppingList(
      mealPlan,
      [recipe1, recipe2],
      [template1, template2, templateRecurring],
      [cat1, cat2, cat3]
    )
    // Produce (sortOrder 0) should come before Dairy (sortOrder 1)
    const onionIndex = items.findIndex((i) => i.name === 'Onion')
    const milkIndex = items.findIndex((i) => i.name === 'Milk')
    expect(onionIndex).toBeLessThan(milkIndex)
  })

  it('assigns sequential sortOrder after sorting', () => {
    const items = generateShoppingList(
      mealPlan,
      [recipe1, recipe2],
      [template1, template2, templateRecurring],
      [cat1, cat2]
    )
    items.forEach((item, index) => {
      expect(item.sortOrder).toBe(index)
    })
  })
})
