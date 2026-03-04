'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMealPlanStore } from '@/stores/useMealPlanStore'
import { WeeklyPlanView } from './WeeklyPlanView'

interface MealPlanDetailPageProps {
  id: string
}

export function MealPlanDetailPage({ id }: MealPlanDetailPageProps) {
  const router = useRouter()
  const mealPlan = useMealPlanStore((s) => s.getById(id))

  if (!mealPlan) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Meal plan not found.</p>
        <Button variant="link" onClick={() => router.push('/meal-plan')}>
          Back to meal plan
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <WeeklyPlanView mealPlan={mealPlan} />
    </div>
  )
}
