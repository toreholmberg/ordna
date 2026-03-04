import type { Category } from '@/types/category'
import type { Recipe } from '@/types/recipe'
import type { MealPlan } from '@/types/meal-plan'
import type { ItemTemplate } from '@/types/item-template'
import type { List } from '@/types/list'
import { getMondayString } from '@/lib/date'
import { generateShoppingList } from '@/lib/generate-list'

type AddRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => Recipe
type AddMealPlan = (plan: Omit<MealPlan, 'id' | 'createdAt' | 'updatedAt'>) => MealPlan
type AddItemTemplate = (
  template: Omit<ItemTemplate, 'id' | 'createdAt' | 'updatedAt'>
) => ItemTemplate
type AddList = (list: Omit<List, 'id' | 'createdAt' | 'updatedAt'>) => List

function byName(categories: Category[], name: string): string | null {
  return categories.find((c) => c.name === name)?.id ?? null
}

export function seedMockData(
  categories: Category[],
  addRecipe: AddRecipe,
  addMealPlan: AddMealPlan,
  addItemTemplate: AddItemTemplate,
  addList: AddList
) {
  const dairy = byName(categories, 'Dairy')
  const pantry = byName(categories, 'Pantry')

  // Recipes
  const tacos = addRecipe({
    name: 'Taco Night',
    description: 'Quick and fun weeknight tacos with all the fixings.',
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    tags: ['mexican', 'family-favorite', 'quick'],
    ingredients: [
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Ground beef',
        quantity: 500,
        unit: 'g',
        sortOrder: 0,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Taco shells',
        quantity: 12,
        unit: 'pcs',
        sortOrder: 1,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Cheddar cheese',
        quantity: 150,
        unit: 'g',
        sortOrder: 2,
        notes: 'shredded',
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Sour cream',
        quantity: 200,
        unit: 'ml',
        sortOrder: 3,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Tomato',
        quantity: 2,
        unit: 'pcs',
        sortOrder: 4,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Lettuce',
        quantity: 0.5,
        unit: 'head',
        sortOrder: 5,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Taco seasoning',
        quantity: 1,
        unit: 'packet',
        sortOrder: 6,
      },
    ],
  })

  const bolognese = addRecipe({
    name: 'Spaghetti Bolognese',
    description: 'Classic Italian meat sauce, slow-simmered for depth of flavour.',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 45,
    tags: ['italian', 'pasta', 'comfort-food'],
    ingredients: [
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Minced beef',
        quantity: 500,
        unit: 'g',
        sortOrder: 0,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Spaghetti',
        quantity: 400,
        unit: 'g',
        sortOrder: 1,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Crushed tomatoes',
        quantity: 400,
        unit: 'g',
        sortOrder: 2,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Onion',
        quantity: 1,
        unit: 'pcs',
        sortOrder: 3,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Garlic',
        quantity: 3,
        unit: 'cloves',
        sortOrder: 4,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Carrot',
        quantity: 1,
        unit: 'pcs',
        sortOrder: 5,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Parmesan',
        quantity: 50,
        unit: 'g',
        sortOrder: 6,
        notes: 'to serve',
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Olive oil',
        quantity: 2,
        unit: 'tbsp',
        sortOrder: 7,
      },
    ],
  })

  const stirFry = addRecipe({
    name: 'Chicken Stir-Fry',
    description: 'Fast, colourful, and packed with veg. Ready in 25 minutes.',
    servings: 3,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    tags: ['asian', 'quick', 'healthy'],
    ingredients: [
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Chicken breast',
        quantity: 500,
        unit: 'g',
        sortOrder: 0,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Bell pepper',
        quantity: 2,
        unit: 'pcs',
        sortOrder: 1,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Broccoli',
        quantity: 300,
        unit: 'g',
        sortOrder: 2,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Soy sauce',
        quantity: 3,
        unit: 'tbsp',
        sortOrder: 3,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Sesame oil',
        quantity: 1,
        unit: 'tbsp',
        sortOrder: 4,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Ginger',
        quantity: 1,
        unit: 'tsp',
        sortOrder: 5,
        notes: 'fresh, grated',
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Jasmine rice',
        quantity: 300,
        unit: 'g',
        sortOrder: 6,
      },
    ],
  })

  addRecipe({
    name: 'Greek Salad',
    description: 'Light and refreshing. Great as a side or a summer main.',
    servings: 4,
    prepTimeMinutes: 10,
    tags: ['salad', 'vegetarian', 'quick'],
    ingredients: [
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Cucumber',
        quantity: 1,
        unit: 'pcs',
        sortOrder: 0,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Cherry tomatoes',
        quantity: 250,
        unit: 'g',
        sortOrder: 1,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Feta cheese',
        quantity: 200,
        unit: 'g',
        sortOrder: 2,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Red onion',
        quantity: 0.5,
        unit: 'pcs',
        sortOrder: 3,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Kalamata olives',
        quantity: 100,
        unit: 'g',
        sortOrder: 4,
      },
      {
        id: crypto.randomUUID(),
        itemTemplateId: null,
        name: 'Olive oil',
        quantity: 3,
        unit: 'tbsp',
        sortOrder: 5,
      },
    ],
  })

  // Recurring items
  const milk = addItemTemplate({
    name: 'Milk',
    categoryId: dairy,
    defaultUnit: 'liter',
    defaultQuantity: 2,
    recurring: true,
    recurrenceRule: 'weekly',
  })
  const bread = addItemTemplate({
    name: 'Bread',
    categoryId: pantry,
    defaultUnit: 'loaf',
    defaultQuantity: 1,
    recurring: true,
    recurrenceRule: 'weekly',
  })

  // Current week meal plan
  const weekStartDate = getMondayString(new Date())
  const mealPlan = addMealPlan({
    name: `Week of ${weekStartDate}`,
    weekStartDate,
    entries: [
      { id: crypto.randomUUID(), dayOfWeek: 'monday', mealType: 'dinner', recipeId: tacos.id },
      {
        id: crypto.randomUUID(),
        dayOfWeek: 'wednesday',
        mealType: 'dinner',
        recipeId: bolognese.id,
      },
      { id: crypto.randomUUID(), dayOfWeek: 'friday', mealType: 'dinner', recipeId: stirFry.id },
    ],
  })

  // Shopping list for the current week
  const allRecipes = [tacos, bolognese, stirFry]
  const allTemplates = [milk, bread]
  const items = generateShoppingList(mealPlan, allRecipes, allTemplates, categories)
  addList({
    name: mealPlan.name ?? `Week of ${weekStartDate}`,
    type: 'shopping',
    mealPlanId: mealPlan.id,
    archived: false,
    items,
  })
}
