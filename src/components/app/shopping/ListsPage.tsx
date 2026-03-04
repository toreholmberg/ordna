'use client'

import Link from 'next/link'
import { ShoppingBag, Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useListStore } from '@/stores/useListStore'
import { useGenerateShoppingList } from '@/hooks/useGenerateShoppingList'
import { useCurrentMealPlan } from '@/hooks/useCurrentMealPlan'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function ListsPage() {
  const lists = useListStore((s) => s.lists)
  const archiveList = useListStore((s) => s.archiveList)
  const { generate } = useGenerateShoppingList()
  const mealPlan = useCurrentMealPlan()
  const router = useRouter()

  const activeLists = lists.filter((l) => !l.archived)
  const archivedLists = lists.filter((l) => l.archived)

  function handleNewList() {
    const list = generate(mealPlan)
    toast.success('Shopping list created')
    router.push(`/lists/${list.id}`)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Lists</h1>
        <Button size="sm" onClick={handleNewList}>
          <ShoppingBag className="mr-1 h-4 w-4" />
          New list
        </Button>
      </div>

      {lists.length === 0 ? (
        <div className="text-muted-foreground py-12 text-center">
          <ShoppingBag className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p className="text-base">No lists yet.</p>
          <p className="mt-1 text-sm">Create a list from your meal plan.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {activeLists.map((list) => {
            const checked = list.items.filter((i) => i.checked).length
            const total = list.items.length
            return (
              <Link key={list.id} href={`/lists/${list.id}`}>
                <div className="bg-card hover:bg-accent rounded-lg border p-4 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{list.name}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {checked}/{total} items checked
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {checked === total && total > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          Done
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.preventDefault()
                          archiveList(list.id)
                          toast.success('List archived')
                        }}
                      >
                        <Archive className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
          {archivedLists.length > 0 && (
            <p className="text-muted-foreground pt-2 text-center text-xs">
              {archivedLists.length} archived list{archivedLists.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
