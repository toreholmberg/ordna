import { z } from 'zod'

export const RecurrenceRuleSchema = z.enum(['weekly', 'biweekly', 'monthly'])

export const ItemTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  categoryId: z.string().uuid().nullable(),
  defaultUnit: z.string().optional(),
  defaultQuantity: z.number().optional(),
  recurring: z.boolean().default(false),
  recurrenceRule: RecurrenceRuleSchema.optional(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type ItemTemplate = z.infer<typeof ItemTemplateSchema>
export type RecurrenceRule = z.infer<typeof RecurrenceRuleSchema>
