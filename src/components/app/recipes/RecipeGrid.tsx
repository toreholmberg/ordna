'use client'

import { RecipeCard } from './RecipeCard'
import type { Recipe } from '@/types/recipe'

interface RecipeGridProps {
  recipes: Recipe[]
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-base">No recipes yet.</p>
        <p className="text-sm mt-1">Add your first recipe to get started.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
