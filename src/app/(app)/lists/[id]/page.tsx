import { ShoppingListDetailPage } from '@/components/app/shopping/ShoppingListDetailPage'

export default async function ListDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ShoppingListDetailPage id={id} />
}
