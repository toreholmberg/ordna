'use client'

import { useCurrentMealPlan } from '@/hooks/useCurrentMealPlan'
import { WeeklyPlanView } from './WeeklyPlanView'

export function MealPlanPage() {
  const mealPlan = useCurrentMealPlan()
  return <WeeklyPlanView mealPlan={mealPlan} />
}
