'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useListStore } from '@/stores/useListStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AddItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.string().optional(),
  unit: z.string().optional(),
  categoryId: z.string().optional(),
})

type AddItemValues = z.infer<typeof AddItemSchema>

interface AddItemSheetProps {
  listId: string
  open: boolean
  onClose: () => void
}

export function AddItemSheet({ listId, open, onClose }: AddItemSheetProps) {
  const addItem = useListStore((s) => s.addItem)
  const categories = useCategoryStore((s) => s.categories)

  const form = useForm<AddItemValues>({
    resolver: zodResolver(AddItemSchema),
    defaultValues: { name: '', quantity: '', unit: '', categoryId: '' },
  })

  function handleSubmit(values: AddItemValues) {
    addItem(listId, {
      name: values.name,
      quantity: values.quantity ? parseFloat(values.quantity) : undefined,
      unit: values.unit || undefined,
      categoryId: values.categoryId || null,
      checked: false,
      sourceType: 'manual',
      sourceRecipeId: null,
      sourceMealPlanId: null,
      notes: undefined,
      sortOrder: 9999,
    })
    form.reset()
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="pb-safe">
        <SheetHeader className="mb-4">
          <SheetTitle>Add item</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Milk" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="any" placeholder="1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="kg, stk..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add to list
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
