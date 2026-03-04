'use client'

import type { Ingredient } from '@/types/recipe'

interface IngredientListProps {
  ingredients: Ingredient[]
}

export function IngredientList({ ingredients }: IngredientListProps) {
  if (ingredients.length === 0) {
    return <p className="text-muted-foreground text-sm">No ingredients added.</p>
  }

  return (
    <ul className="space-y-2">
      {ingredients.map((ing) => (
        <li key={ing.id} className="flex items-start gap-2 text-sm">
          <span className="bg-foreground mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
          <span>
            {ing.quantity != null && (
              <span className="font-medium">
                {ing.quantity}
                {ing.unit ? ` ${ing.unit}` : ''}{' '}
              </span>
            )}
            {ing.name}
            {ing.notes && <span className="text-muted-foreground"> — {ing.notes}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}
