'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShoppingListItem } from './ShoppingListItem'
import { AddItemSheet } from './AddItemSheet'
import { useListStore } from '@/stores/useListStore'
import type { List } from '@/types/list'

interface ShoppingListProps {
  list: List
}

export function ShoppingList({ list }: ShoppingListProps) {
  const [addOpen, setAddOpen] = useState(false)
  const toggleItem = useListStore((s) => s.toggleItem)
  const removeItem = useListStore((s) => s.removeItem)

  const unchecked = list.items.filter((i) => !i.checked).sort((a, b) => a.sortOrder - b.sortOrder)
  const checked = list.items.filter((i) => i.checked).sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">{list.name}</h1>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add item
        </Button>
      </div>

      {list.items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-base">List is empty.</p>
          <p className="text-sm mt-1">Add items or generate from a meal plan.</p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card divide-y divide-border overflow-hidden">
          {unchecked.map((item) => (
            <div key={item.id} className="px-4">
              <ShoppingListItem
                item={item}
                onToggle={() => toggleItem(list.id, item.id)}
                onRemove={() => removeItem(list.id, item.id)}
              />
            </div>
          ))}
          {checked.length > 0 && unchecked.length > 0 && (
            <div className="px-4 py-2 bg-muted/30">
              <p className="text-xs text-muted-foreground font-medium">Checked</p>
            </div>
          )}
          {checked.map((item) => (
            <div key={item.id} className="px-4">
              <ShoppingListItem
                item={item}
                onToggle={() => toggleItem(list.id, item.id)}
                onRemove={() => removeItem(list.id, item.id)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-muted-foreground text-center">
        {checked.length}/{list.items.length} items checked
      </div>

      <AddItemSheet
        listId={list.id}
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />
    </div>
  )
}
