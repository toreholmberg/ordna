import { RecipeDetailPage } from '@/components/app/recipes/RecipeDetailPage'

export default async function RecipeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <RecipeDetailPage id={id} />
}
