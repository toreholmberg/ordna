import { z } from 'zod'

export const IngredientSchema = z.object({
  id: z.string().uuid(),
  itemTemplateId: z.string().uuid().nullable(),
  name: z.string().min(1),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
  sortOrder: z.number().int(),
})

export const RecipeSchema = z.object({
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

export type Recipe = z.infer<typeof RecipeSchema>
export type Ingredient = z.infer<typeof IngredientSchema>
