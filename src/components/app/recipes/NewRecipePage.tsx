'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { RecipeForm } from './RecipeForm'
import { toast } from 'sonner'
import type { Recipe } from '@/types/recipe'

export function NewRecipePage() {
  const router = useRouter()
  const addRecipe = useRecipeStore((s) => s.addRecipe)

  function handleSubmit(data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) {
    const recipe = addRecipe(data)
    toast.success('Recipe added')
    router.push(`/recipes/${recipe.id}`)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">New Recipe</h1>
      </div>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Add Recipe" />
    </div>
  )
}
