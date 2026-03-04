import { EditRecipePage } from '@/components/app/recipes/EditRecipePage'

export default async function EditRecipe({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <EditRecipePage id={id} />
}
