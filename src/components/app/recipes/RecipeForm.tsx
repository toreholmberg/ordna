'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type { Recipe } from '@/types/recipe'

const IngredientFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name required'),
  quantity: z.string().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
  sortOrder: z.number().int(),
  itemTemplateId: z.string().nullable(),
})

const RecipeFormSchema = z.object({
  name: z.string().min(1, 'Recipe name is required'),
  description: z.string().optional(),
  servings: z.string().min(1),
  prepTimeMinutes: z.string().optional(),
  cookTimeMinutes: z.string().optional(),
  instructions: z.string().optional(),
  tags: z.string().optional(),
  sourceUrl: z.string().optional(),
  ingredients: z.array(IngredientFormSchema),
})

type RecipeFormValues = z.infer<typeof RecipeFormSchema>

interface RecipeFormProps {
  defaultValues?: Partial<Recipe>
  onSubmit: (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => void
  submitLabel?: string
}

function toFormValues(recipe?: Partial<Recipe>): RecipeFormValues {
  return {
    name: recipe?.name ?? '',
    description: recipe?.description ?? '',
    servings: String(recipe?.servings ?? 4),
    prepTimeMinutes: recipe?.prepTimeMinutes != null ? String(recipe.prepTimeMinutes) : '',
    cookTimeMinutes: recipe?.cookTimeMinutes != null ? String(recipe.cookTimeMinutes) : '',
    instructions: recipe?.instructions ?? '',
    tags: recipe?.tags?.join(', ') ?? '',
    sourceUrl: recipe?.sourceUrl ?? '',
    ingredients: (recipe?.ingredients ?? []).map((ing) => ({
      id: ing.id,
      name: ing.name,
      quantity: ing.quantity != null ? String(ing.quantity) : '',
      unit: ing.unit ?? '',
      notes: ing.notes ?? '',
      sortOrder: ing.sortOrder,
      itemTemplateId: ing.itemTemplateId,
    })),
  }
}

export function RecipeForm({ defaultValues, onSubmit, submitLabel = 'Save Recipe' }: RecipeFormProps) {
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: toFormValues(defaultValues),
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  function handleSubmit(values: RecipeFormValues) {
    const tags = values.tags
      ? values.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    onSubmit({
      name: values.name,
      description: values.description || undefined,
      servings: parseInt(values.servings, 10) || 4,
      prepTimeMinutes: values.prepTimeMinutes ? parseInt(values.prepTimeMinutes, 10) : undefined,
      cookTimeMinutes: values.cookTimeMinutes ? parseInt(values.cookTimeMinutes, 10) : undefined,
      instructions: values.instructions || undefined,
      tags,
      sourceUrl: values.sourceUrl || undefined,
      imageUrl: undefined,
      ingredients: values.ingredients.map((ing, index) => ({
        id: ing.id || crypto.randomUUID(),
        name: ing.name,
        quantity: ing.quantity ? parseFloat(ing.quantity) : undefined,
        unit: ing.unit || undefined,
        notes: ing.notes || undefined,
        sortOrder: index,
        itemTemplateId: ing.itemTemplateId,
      })),
    })
  }

  function addIngredient() {
    append({
      id: crypto.randomUUID(),
      name: '',
      quantity: '',
      unit: '',
      notes: '',
      sortOrder: fields.length,
      itemTemplateId: null,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic info */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Spaghetti Bolognese" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description..." rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="servings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servings</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prepTimeMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prep (min)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cookTimeMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cook (min)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="italian, pasta, quick (comma-separated)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ingredients */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Ingredients</h3>
            <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1 grid grid-cols-[2fr_1fr_1fr] gap-2">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && <FormLabel className="text-xs">Ingredient</FormLabel>}
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && <FormLabel className="text-xs">Qty</FormLabel>}
                        <FormControl>
                          <Input type="number" min={0} step="any" placeholder="2" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.unit`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && <FormLabel className="text-xs">Unit</FormLabel>}
                        <FormControl>
                          <Input placeholder="kg" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={index === 0 ? 'mt-6' : ''}
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Step by step instructions..." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  )
}
