import { z } from 'zod'

export const ListTypeSchema = z.enum(['shopping', 'task', 'home-improvement', 'custom'])

export const ListItemSourceSchema = z.enum(['recipe', 'recurring', 'manual', 'template'])

export const ListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  categoryId: z.string().uuid().nullable(),
  checked: z.boolean().default(false),
  sourceType: ListItemSourceSchema,
  sourceRecipeId: z.string().uuid().nullable(),
  sourceMealPlanId: z.string().uuid().nullable(),
  notes: z.string().optional(),
  sortOrder: z.number().int(),
  addedAt: z.string().datetime(),
})

export const ListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: ListTypeSchema,
  mealPlanId: z.string().uuid().nullable(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  archived: z.boolean().default(false),
  items: z.array(ListItemSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type List = z.infer<typeof ListSchema>
export type ListItem = z.infer<typeof ListItemSchema>
export type ListType = z.infer<typeof ListTypeSchema>
export type ListItemSource = z.infer<typeof ListItemSourceSchema>
