import { z } from 'zod'

export const DayOfWeekSchema = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
])

export const MealTypeSchema = z.enum(['breakfast', 'lunch', 'dinner', 'snack'])

export const MealPlanEntrySchema = z.object({
  id: z.string().uuid(),
  dayOfWeek: DayOfWeekSchema,
  mealType: MealTypeSchema.default('dinner'),
  recipeId: z.string().uuid().nullable(),
  servings: z.number().int().optional(),
  notes: z.string().optional(),
})

export const MealPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  weekStartDate: z.string(),
  entries: z.array(MealPlanEntrySchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type MealPlan = z.infer<typeof MealPlanSchema>
export type MealPlanEntry = z.infer<typeof MealPlanEntrySchema>
export type DayOfWeek = z.infer<typeof DayOfWeekSchema>
export type MealType = z.infer<typeof MealTypeSchema>
