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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{list.name}</h1>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Add item
        </Button>
      </div>

      {list.items.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          <p className="text-base">List is empty.</p>
          <p className="mt-1 text-sm">Add items or generate from a meal plan.</p>
        </div>
      ) : (
        <div className="bg-card divide-border divide-y overflow-hidden rounded-lg border">
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
            <div className="bg-muted/30 px-4 py-2">
              <p className="text-muted-foreground text-xs font-medium">Checked</p>
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

      <div className="text-muted-foreground mt-4 text-center text-xs">
        {checked.length}/{list.items.length} items checked
      </div>

      <AddItemSheet listId={list.id} open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}
