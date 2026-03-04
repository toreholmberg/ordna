'use client'

import { useState } from 'react'
import { Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { useMealPlanStore } from '@/stores/useMealPlanStore'
import { useItemTemplateStore } from '@/stores/useItemTemplateStore'
import { useListStore } from '@/stores/useListStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { seedMockData } from '@/lib/seed'

export function DebugPanel() {
  const [open, setOpen] = useState(false)

  const categories = useCategoryStore((s) => s.categories)
  const resetCategories = useCategoryStore((s) => s.reset)
  const addRecipe = useRecipeStore((s) => s.addRecipe)
  const resetRecipes = useRecipeStore((s) => s.reset)
  const addMealPlan = useMealPlanStore((s) => s.addMealPlan)
  const resetMealPlans = useMealPlanStore((s) => s.reset)
  const addItemTemplate = useItemTemplateStore((s) => s.addItemTemplate)
  const resetItemTemplates = useItemTemplateStore((s) => s.reset)
  const addList = useListStore((s) => s.addList)
  const resetLists = useListStore((s) => s.reset)

  function clearAll() {
    resetRecipes()
    resetMealPlans()
    resetItemTemplates()
    resetLists()
    resetCategories()
  }

  function seed() {
    seedMockData(categories, addRecipe, addMealPlan, addItemTemplate, addList)
    setOpen(false)
  }

  function clear() {
    clearAll()
    setOpen(false)
  }

  function resetAndSeed() {
    clearAll()
    // Categories are reset synchronously; read fresh state via the store
    const freshCategories = useCategoryStore.getState().categories
    seedMockData(freshCategories, addRecipe, addMealPlan, addItemTemplate, addList)
    setOpen(false)
  }

  return (
    <div className="fixed right-4 bottom-24 z-50">
      {open && (
        <Card className="mb-2 w-44 shadow-lg">
          <CardContent className="flex flex-col gap-1 p-2">
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={seed}>
              Seed
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" onClick={clear}>
              Clear
            </Button>
            <Button size="sm" className="w-full justify-start" onClick={resetAndSeed}>
              Reset &amp; Seed
            </Button>
          </CardContent>
        </Card>
      )}
      <Button
        variant="secondary"
        size="icon"
        className="size-8 rounded-full opacity-60 shadow-md hover:opacity-100"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle debug panel"
      >
        <Wrench className="size-4" />
      </Button>
    </div>
  )
}
