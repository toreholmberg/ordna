import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MealPlan, MealPlanEntry } from '@/types/meal-plan'
import { getMonday } from '@/lib/date'

interface MealPlanStore {
  mealPlans: MealPlan[]
  addMealPlan: (plan: Omit<MealPlan, 'id' | 'createdAt' | 'updatedAt'>) => MealPlan
  updateMealPlan: (
    id: string,
    updates: Partial<Omit<MealPlan, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void
  deleteMealPlan: (id: string) => void
  getById: (id: string) => MealPlan | undefined
  getOrCreateCurrentWeek: () => MealPlan
  setEntry: (planId: string, entry: Omit<MealPlanEntry, 'id'> & { id?: string }) => void
  removeEntry: (planId: string, entryId: string) => void
  reset: () => void
}

export const useMealPlanStore = create<MealPlanStore>()(
  persist(
    (set, get) => ({
      mealPlans: [],

      addMealPlan: (plan) => {
        const now = new Date().toISOString()
        const newPlan: MealPlan = {
          ...plan,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ mealPlans: [...state.mealPlans, newPlan] }))
        return newPlan
      },

      updateMealPlan: (id, updates) => {
        const now = new Date().toISOString()
        set((state) => ({
          mealPlans: state.mealPlans.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: now } : p
          ),
        }))
      },

      deleteMealPlan: (id) =>
        set((state) => ({ mealPlans: state.mealPlans.filter((p) => p.id !== id) })),

      getById: (id) => get().mealPlans.find((p) => p.id === id),

      getOrCreateCurrentWeek: () => {
        const monday = getMonday(new Date())
        const weekStartDate = monday.toISOString().split('T')[0]
        const existing = get().mealPlans.find((p) => p.weekStartDate === weekStartDate)
        if (existing) return existing
        return get().addMealPlan({
          name: `Week of ${weekStartDate}`,
          weekStartDate,
          entries: [],
        })
      },

      setEntry: (planId, entry) => {
        const now = new Date().toISOString()
        const entryWithId: MealPlanEntry = { ...entry, id: entry.id ?? crypto.randomUUID() }
        set((state) => ({
          mealPlans: state.mealPlans.map((p) => {
            if (p.id !== planId) return p
            const existingIndex = p.entries.findIndex(
              (e) => e.dayOfWeek === entry.dayOfWeek && e.mealType === entry.mealType
            )
            const entries =
              existingIndex >= 0
                ? p.entries.map((e, i) => (i === existingIndex ? entryWithId : e))
                : [...p.entries, entryWithId]
            return { ...p, entries, updatedAt: now }
          }),
        }))
      },

      removeEntry: (planId, entryId) => {
        const now = new Date().toISOString()
        set((state) => ({
          mealPlans: state.mealPlans.map((p) =>
            p.id === planId
              ? { ...p, entries: p.entries.filter((e) => e.id !== entryId), updatedAt: now }
              : p
          ),
        }))
      },

      reset: () => set({ mealPlans: [] }),
    }),
    { name: 'ordna-meal-plans' }
  )
)
