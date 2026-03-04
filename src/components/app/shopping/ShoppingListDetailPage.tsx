'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useListStore } from '@/stores/useListStore'
import { ShoppingList } from './ShoppingList'

interface ShoppingListDetailPageProps {
  id: string
}

export function ShoppingListDetailPage({ id }: ShoppingListDetailPageProps) {
  const router = useRouter()
  const list = useListStore((s) => s.getById(id))

  if (!list) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">List not found.</p>
        <Button variant="link" onClick={() => router.push('/lists')}>
          Back to lists
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <ShoppingList list={list} />
    </div>
  )
}
