'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ListItem } from '@/types/list'

interface ShoppingListItemProps {
  item: ListItem
  onToggle: () => void
  onRemove: () => void
}

export function ShoppingListItem({ item, onToggle, onRemove }: ShoppingListItemProps) {
  return (
    <div className="flex min-h-[56px] items-center gap-3 py-2">
      <Checkbox
        checked={item.checked}
        onCheckedChange={onToggle}
        className="h-6 w-6 shrink-0"
        aria-label={`Mark ${item.name} as ${item.checked ? 'unchecked' : 'checked'}`}
      />
      <div className="min-w-0 flex-1">
        <span className={cn('text-base', item.checked && 'text-muted-foreground line-through')}>
          {item.quantity != null && (
            <span className="font-medium">
              {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(1)}
              {item.unit ? ` ${item.unit}` : ''}{' '}
            </span>
          )}
          {item.name}
        </span>
        {item.notes && <p className="text-muted-foreground mt-0.5 text-xs">{item.notes}</p>}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
        onClick={onRemove}
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
