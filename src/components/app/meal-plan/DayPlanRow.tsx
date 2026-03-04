'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RecipePicker } from './RecipePicker'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { useMealPlanStore } from '@/stores/useMealPlanStore'
import type { DayOfWeek } from '@/types/meal-plan'
import type { Recipe } from '@/types/recipe'

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

interface DayPlanRowProps {
  planId: string
  day: DayOfWeek
  recipeId: string | null
  entryId?: string
}

export function DayPlanRow({ planId, day, recipeId, entryId }: DayPlanRowProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const recipe = useRecipeStore((s) => (recipeId ? s.getById(recipeId) : undefined))
  const setEntry = useMealPlanStore((s) => s.setEntry)
  const removeEntry = useMealPlanStore((s) => s.removeEntry)

  function handleSelect(selectedRecipe: Recipe) {
    setEntry(planId, {
      id: entryId,
      dayOfWeek: day,
      mealType: 'dinner',
      recipeId: selectedRecipe.id,
      servings: undefined,
      notes: undefined,
    })
  }

  function handleRemove() {
    if (entryId) removeEntry(planId, entryId)
  }

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <span className="text-sm font-medium w-24 shrink-0">{DAY_LABELS[day]}</span>
      <div className="flex-1 flex items-center justify-end gap-2">
        {recipe ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground line-clamp-1">{recipe.name}</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleRemove}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setPickerOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add dinner
          </Button>
        )}
      </div>
      <RecipePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  )
}
