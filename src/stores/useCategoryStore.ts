import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Category } from '@/types/category'

const DEFAULT_CATEGORIES: Category[] = [
  { id: crypto.randomUUID(), name: 'Produce', type: 'grocery', color: '#4ade80', icon: 'Leaf', sortOrder: 0 },
  { id: crypto.randomUUID(), name: 'Dairy', type: 'grocery', color: '#60a5fa', icon: 'Milk', sortOrder: 1 },
  { id: crypto.randomUUID(), name: 'Meat', type: 'grocery', color: '#f87171', icon: 'Beef', sortOrder: 2 },
  { id: crypto.randomUUID(), name: 'Pantry', type: 'grocery', color: '#fbbf24', icon: 'Package', sortOrder: 3 },
  { id: crypto.randomUUID(), name: 'Frozen', type: 'grocery', color: '#818cf8', icon: 'Snowflake', sortOrder: 4 },
  { id: crypto.randomUUID(), name: 'Household', type: 'household', color: '#94a3b8', icon: 'Home', sortOrder: 5 },
  { id: crypto.randomUUID(), name: 'Other', type: 'custom', color: '#d1d5db', icon: 'MoreHorizontal', sortOrder: 6 },
]

interface CategoryStore {
  categories: Category[]
  addCategory: (category: Omit<Category, 'id'>) => void
  updateCategory: (id: string, updates: Partial<Omit<Category, 'id'>>) => void
  deleteCategory: (id: string) => void
  getById: (id: string) => Category | undefined
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: DEFAULT_CATEGORIES,

      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: crypto.randomUUID() }],
        })),

      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),

      getById: (id) => get().categories.find((c) => c.id === id),
    }),
    { name: 'ordna-categories' }
  )
)
