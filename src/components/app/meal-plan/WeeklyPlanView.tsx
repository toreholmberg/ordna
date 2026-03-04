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
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">{formatWeekLabel(mealPlan.weekStartDate)}</h1>
        <Button size="sm" onClick={handleGenerateList}>
          <ShoppingBag className="mr-1 h-4 w-4" />
          Generate list
        </Button>
      </div>

      <div className="bg-card divide-border divide-y overflow-hidden rounded-lg border">
        {DAYS.map((day) => {
          const entry = mealPlan.entries.find((e) => e.dayOfWeek === day && e.mealType === 'dinner')
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
