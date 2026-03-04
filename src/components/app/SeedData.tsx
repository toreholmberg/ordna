'use client'

import { useEffect } from 'react'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { useMealPlanStore } from '@/stores/useMealPlanStore'
import { useItemTemplateStore } from '@/stores/useItemTemplateStore'
import { seedMockData } from '@/lib/seed'

export function SeedData() {
  const recipes = useRecipeStore((s) => s.recipes)
  const addRecipe = useRecipeStore((s) => s.addRecipe)
  const categories = useCategoryStore((s) => s.categories)
  const addMealPlan = useMealPlanStore((s) => s.addMealPlan)
  const mealPlans = useMealPlanStore((s) => s.mealPlans)
  const addItemTemplate = useItemTemplateStore((s) => s.addItemTemplate)

  useEffect(() => {
    if (recipes.length > 0 || mealPlans.length > 0) return
    seedMockData(categories, addRecipe, addMealPlan, addItemTemplate)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
