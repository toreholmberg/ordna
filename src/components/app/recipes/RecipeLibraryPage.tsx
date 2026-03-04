'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { RecipeGrid } from './RecipeGrid'

export function RecipeLibraryPage() {
  const recipes = useRecipeStore((s) => s.recipes)
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : recipes

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Recipes</h1>
        <Link href="/recipes/new">
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </Link>
      </div>
      {recipes.length > 0 && (
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
      )}
      <RecipeGrid recipes={filtered} />
    </div>
  )
}
