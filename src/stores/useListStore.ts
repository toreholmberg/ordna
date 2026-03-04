import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { List, ListItem } from '@/types/list'

interface ListStore {
  lists: List[]
  addList: (list: Omit<List, 'id' | 'createdAt' | 'updatedAt'>) => List
  updateList: (id: string, updates: Partial<Omit<List, 'id' | 'createdAt' | 'updatedAt'>>) => void
  deleteList: (id: string) => void
  getById: (id: string) => List | undefined
  getActive: () => List | undefined
  addItem: (listId: string, item: Omit<ListItem, 'id' | 'addedAt'>) => void
  updateItem: (
    listId: string,
    itemId: string,
    updates: Partial<Omit<ListItem, 'id' | 'addedAt'>>
  ) => void
  removeItem: (listId: string, itemId: string) => void
  toggleItem: (listId: string, itemId: string) => void
  archiveList: (id: string) => void
  replaceItems: (listId: string, items: ListItem[]) => void
  reset: () => void
}

export const useListStore = create<ListStore>()(
  persist(
    (set, get) => ({
      lists: [],

      addList: (list) => {
        const now = new Date().toISOString()
        const newList: List = { ...list, id: crypto.randomUUID(), createdAt: now, updatedAt: now }
        set((state) => ({ lists: [...state.lists, newList] }))
        return newList
      },

      updateList: (id, updates) => {
        const now = new Date().toISOString()
        set((state) => ({
          lists: state.lists.map((l) => (l.id === id ? { ...l, ...updates, updatedAt: now } : l)),
        }))
      },

      deleteList: (id) => set((state) => ({ lists: state.lists.filter((l) => l.id !== id) })),

      getById: (id) => get().lists.find((l) => l.id === id),

      getActive: () => get().lists.find((l) => l.type === 'shopping' && !l.archived),

      addItem: (listId, item) => {
        const now = new Date().toISOString()
        const newItem: ListItem = { ...item, id: crypto.randomUUID(), addedAt: now }
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId ? { ...l, items: [...l.items, newItem], updatedAt: now } : l
          ),
        }))
      },

      updateItem: (listId, itemId, updates) => {
        const now = new Date().toISOString()
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? {
                  ...l,
                  items: l.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
                  updatedAt: now,
                }
              : l
          ),
        }))
      },

      removeItem: (listId, itemId) => {
        const now = new Date().toISOString()
        set((state) => ({
          lists: state.lists.map((l) =>
            l.id === listId
              ? { ...l, items: l.items.filter((i) => i.id !== itemId), updatedAt: now }
              : l
          ),
        }))
      },

      toggleItem: (listId, itemId) => {
        const list = get().lists.find((l) => l.id === listId)
        const item = list?.items.find((i) => i.id === itemId)
        if (!item) return
        get().updateItem(listId, itemId, { checked: !item.checked })
      },

      archiveList: (id) => get().updateList(id, { archived: true }),

      replaceItems: (listId, items) => {
        const now = new Date().toISOString()
        set((state) => ({
          lists: state.lists.map((l) => (l.id === listId ? { ...l, items, updatedAt: now } : l)),
        }))
      },

      reset: () => set({ lists: [] }),
    }),
    { name: 'ordna-lists' }
  )
)
