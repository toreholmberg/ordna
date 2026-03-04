'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { IngredientList } from './IngredientList'
import { toast } from 'sonner'

interface RecipeDetailPageProps {
  id: string
}

export function RecipeDetailPage({ id }: RecipeDetailPageProps) {
  const router = useRouter()
  const recipe = useRecipeStore((s) => s.getById(id))
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)

  if (!recipe) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Recipe not found.</p>
        <Button variant="link" onClick={() => router.push('/recipes')}>
          Back to recipes
        </Button>
      </div>
    )
  }

  const totalTime = (recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0)

  function handleDelete() {
    if (!confirm('Delete this recipe?')) return
    deleteRecipe(id)
    toast.success('Recipe deleted')
    router.push('/recipes')
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="flex-1 text-lg leading-tight font-semibold">{recipe.name}</h1>
        <Link href={`/recipes/${id}/edit`} aria-label="Edit recipe">
          <Button variant="ghost" size="icon" tabIndex={-1}>
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" aria-label="Delete recipe" onClick={handleDelete}>
          <Trash2 className="text-destructive h-4 w-4" />
        </Button>
      </div>

      {recipe.description && (
        <p className="text-muted-foreground mb-4 text-sm">{recipe.description}</p>
      )}

      <div className="text-muted-foreground mb-4 flex items-center gap-4 text-sm">
        {totalTime > 0 && (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {totalTime} min
          </span>
        )}
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          {recipe.servings} servings
        </span>
      </div>

      {recipe.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Separator className="my-4" />

      <h2 className="mb-3 text-sm font-medium">Ingredients</h2>
      <IngredientList ingredients={recipe.ingredients} />

      {recipe.instructions && (
        <>
          <Separator className="my-4" />
          <h2 className="mb-3 text-sm font-medium">Instructions</h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{recipe.instructions}</p>
        </>
      )}

      {recipe.sourceUrl && (
        <>
          <Separator className="my-4" />
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-2 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Original recipe
          </a>
        </>
      )}
    </div>
  )
}
