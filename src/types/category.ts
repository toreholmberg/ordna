import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['grocery', 'household', 'home-improvement', 'custom']),
  color: z.string().optional(),
  icon: z.string().optional(),
  sortOrder: z.number().int(),
})

export type Category = z.infer<typeof CategorySchema>
