'use client'

import Link from 'next/link'
import { Clock, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Recipe } from '@/types/recipe'

interface RecipeCardProps {
  recipe: Recipe
  className?: string
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const totalTime = (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0)

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div
        className={cn(
          'bg-card hover:bg-accent active:bg-accent rounded-lg border p-4 transition-colors',
          className
        )}
      >
        <h3 className="mb-2 text-base leading-tight font-semibold">{recipe.name}</h3>
        {recipe.description && (
          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">{recipe.description}</p>
        )}
        <div className="text-muted-foreground mb-2 flex items-center gap-3 text-xs">
          {totalTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {totalTime} min
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {recipe.servings} servings
          </span>
          <span>{recipe.ingredients.length} ingredients</span>
        </div>
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
