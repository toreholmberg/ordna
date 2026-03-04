'use client'

import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DayPlanRow } from './DayPlanRow'
import { useGenerateShoppingList } from '@/hooks/useGenerateShoppingList'
import { formatWeekLabel } from '@/lib/date'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { MealPlan } from '@/types/meal-plan'
import type { DayOfWeek } from '@/types/meal-plan'

const DAYS: DayOfWeek[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

interface WeeklyPlanViewProps {
  mealPlan: MealPlan
}

export function WeeklyPlanView({ mealPlan }: WeeklyPlanViewProps) {
  const { generate } = useGenerateShoppingList()
  const router = useRouter()

  function handleGenerateList() {
    const list = generate(mealPlan)
    toast.success('Shopping list generated')
    router.push(`/lists/${list.id}`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">{formatWeekLabel(mealPlan.weekStartDate)}</h1>
        <Button size="sm" onClick={handleGenerateList}>
          <ShoppingBag className="h-4 w-4 mr-1" />
          Generate list
        </Button>
      </div>

      <div className="rounded-lg border bg-card divide-y divide-border overflow-hidden">
        {DAYS.map((day) => {
          const entry = mealPlan.entries.find(
            (e) => e.dayOfWeek === day && e.mealType === 'dinner'
          )
          return (
            <div key={day} className="px-4">
              <DayPlanRow
                planId={mealPlan.id}
                day={day}
                recipeId={entry?.recipeId ?? null}
                entryId={entry?.id}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
