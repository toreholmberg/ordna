'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { RecipeForm } from './RecipeForm'
import { toast } from 'sonner'
import type { Recipe } from '@/types/recipe'

interface EditRecipePageProps {
  id: string
}

export function EditRecipePage({ id }: EditRecipePageProps) {
  const router = useRouter()
  const recipe = useRecipeStore((s) => s.getById(id))
  const updateRecipe = useRecipeStore((s) => s.updateRecipe)

  if (!recipe) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Recipe not found.</p>
      </div>
    )
  }

  function handleSubmit(data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) {
    updateRecipe(id, data)
    toast.success('Recipe updated')
    router.push(`/recipes/${id}`)
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Edit Recipe</h1>
      </div>
      <RecipeForm defaultValues={recipe} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
