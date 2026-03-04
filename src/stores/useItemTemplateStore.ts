import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ItemTemplate } from '@/types/item-template'

interface ItemTemplateStore {
  itemTemplates: ItemTemplate[]
  addItemTemplate: (template: Omit<ItemTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateItemTemplate: (
    id: string,
    updates: Partial<Omit<ItemTemplate, 'id' | 'createdAt' | 'updatedAt'>>
  ) => void
  deleteItemTemplate: (id: string) => void
  getById: (id: string) => ItemTemplate | undefined
  getRecurring: () => ItemTemplate[]
}

export const useItemTemplateStore = create<ItemTemplateStore>()(
  persist(
    (set, get) => ({
      itemTemplates: [],

      addItemTemplate: (template) => {
        const now = new Date().toISOString()
        set((state) => ({
          itemTemplates: [
            ...state.itemTemplates,
            { ...template, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
          ],
        }))
      },

      updateItemTemplate: (id, updates) => {
        const now = new Date().toISOString()
        set((state) => ({
          itemTemplates: state.itemTemplates.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: now } : t
          ),
        }))
      },

      deleteItemTemplate: (id) =>
        set((state) => ({
          itemTemplates: state.itemTemplates.filter((t) => t.id !== id),
        })),

      getById: (id) => get().itemTemplates.find((t) => t.id === id),

      getRecurring: () => get().itemTemplates.filter((t) => t.recurring),
    }),
    { name: 'ordna-item-templates' }
  )
)
