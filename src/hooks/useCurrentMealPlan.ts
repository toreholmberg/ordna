import { useMealPlanStore } from '@/stores/useMealPlanStore'
import type { MealPlan } from '@/types/meal-plan'

/**
 * Returns the meal plan for the current week, creating one if it doesn't exist.
 */
export function useCurrentMealPlan(): MealPlan {
  return useMealPlanStore((s) => s.getOrCreateCurrentWeek())
}
