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
    <div className="flex items-center gap-3 min-h-[56px] py-2">
      <Checkbox
        checked={item.checked}
        onCheckedChange={onToggle}
        className="h-6 w-6 shrink-0"
        aria-label={`Mark ${item.name} as ${item.checked ? 'unchecked' : 'checked'}`}
      />
      <div className="flex-1 min-w-0">
        <span
          className={cn(
            'text-base',
            item.checked && 'line-through text-muted-foreground'
          )}
        >
          {item.quantity != null && (
            <span className="font-medium">
              {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(1)}
              {item.unit ? ` ${item.unit}` : ''}{' '}
            </span>
          )}
          {item.name}
        </span>
        {item.notes && (
          <p className="text-xs text-muted-foreground mt-0.5">{item.notes}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
        onClick={onRemove}
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
