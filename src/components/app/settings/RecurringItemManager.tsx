'use client'

import { useState } from 'react'
import { Plus, Trash2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useItemTemplateStore } from '@/stores/useItemTemplateStore'
import { useCategoryStore } from '@/stores/useCategoryStore'

export function RecurringItemManager() {
  const itemTemplates = useItemTemplateStore((s) => s.itemTemplates)
  const addItemTemplate = useItemTemplateStore((s) => s.addItemTemplate)
  const deleteItemTemplate = useItemTemplateStore((s) => s.deleteItemTemplate)
  const categories = useCategoryStore((s) => s.categories)

  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [unit, setUnit] = useState('')

  const recurring = itemTemplates.filter((t) => t.recurring)

  function handleAdd() {
    const trimmed = name.trim()
    if (!trimmed) return
    addItemTemplate({
      name: trimmed,
      categoryId: categoryId || null,
      defaultUnit: unit || undefined,
      recurring: true,
      recurrenceRule: 'weekly',
    })
    setName('')
    setUnit('')
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <RefreshCw className="text-muted-foreground h-4 w-4" />
        <h2 className="text-sm font-medium">Recurring items</h2>
      </div>
      <p className="text-muted-foreground mb-3 text-xs">
        These are always added to your shopping list.
      </p>
      {recurring.length > 0 && (
        <div className="bg-card divide-border mb-3 divide-y overflow-hidden rounded-lg border">
          {recurring.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <span className="text-sm">{t.name}</span>
                {t.defaultUnit && (
                  <span className="text-muted-foreground ml-2 text-xs">({t.defaultUnit})</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive h-7 w-7"
                onClick={() => deleteItemTemplate(t.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <Input
          placeholder="Item name (e.g. Milk)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Unit (optional)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <Select onValueChange={setCategoryId} value={categoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAdd} variant="outline" className="w-full">
          <Plus className="mr-1 h-4 w-4" />
          Add recurring item
        </Button>
      </div>
    </div>
  )
}
