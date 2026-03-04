import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Recipe } from '@/types/recipe'

interface RecipeStore {
  recipes: Recipe[]
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => Recipe
  updateRecipe: (id: string, updates: Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>) => void
  deleteRecipe: (id: string) => void
  getById: (id: string) => Recipe | undefined
}

export const useRecipeStore = create<RecipeStore>()(
  persist(
    (set, get) => ({
      recipes: [],

      addRecipe: (recipe) => {
        const now = new Date().toISOString()
        const newRecipe: Recipe = { ...recipe, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
        set((state) => ({ recipes: [...state.recipes, newRecipe] }))
        return newRecipe
      },

      updateRecipe: (id, updates) => {
        const now = new Date().toISOString()
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === id ? { ...r, ...updates, updatedAt: now } : r
          ),
        }))
      },

      deleteRecipe: (id) =>
        set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

      getById: (id) => get().recipes.find((r) => r.id === id),
    }),
    { name: 'ordna-recipes' }
  )
)
