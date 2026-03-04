'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRecipeStore } from '@/stores/useRecipeStore'
import type { Recipe } from '@/types/recipe'

interface RecipePickerProps {
  open: boolean
  onClose: () => void
  onSelect: (recipe: Recipe) => void
}

export function RecipePicker({ open, onClose, onSelect }: RecipePickerProps) {
  const recipes = useRecipeStore((s) => s.recipes)
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? recipes.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
    : recipes

  function handleSelect(recipe: Recipe) {
    onSelect(recipe)
    onClose()
    setSearch('')
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pick a recipe</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>
        <div className="max-h-72 overflow-y-auto space-y-1 mt-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              {recipes.length === 0 ? 'No recipes yet. Add some first.' : 'No matches.'}
            </p>
          ) : (
            filtered.map((recipe) => (
              <button
                key={recipe.id}
                className="w-full text-left px-3 py-3 rounded-md hover:bg-accent transition-colors text-sm"
                onClick={() => handleSelect(recipe)}
              >
                <span className="font-medium">{recipe.name}</span>
                {recipe.servings && (
                  <span className="text-muted-foreground ml-2">
                    ({recipe.servings} servings)
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
