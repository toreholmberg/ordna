import { MealPlanDetailPage } from '@/components/app/meal-plan/MealPlanDetailPage'

export default async function MealPlanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <MealPlanDetailPage id={id} />
}
