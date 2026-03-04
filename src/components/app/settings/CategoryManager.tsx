'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCategoryStore } from '@/stores/useCategoryStore'

export function CategoryManager() {
  const categories = useCategoryStore((s) => s.categories)
  const addCategory = useCategoryStore((s) => s.addCategory)
  const deleteCategory = useCategoryStore((s) => s.deleteCategory)
  const [newName, setNewName] = useState('')

  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder)

  function handleAdd() {
    const name = newName.trim()
    if (!name) return
    addCategory({
      name,
      type: 'custom',
      sortOrder: categories.length,
    })
    setNewName('')
  }

  return (
    <div>
      <h2 className="text-sm font-medium mb-3">Categories</h2>
      <div className="rounded-lg border bg-card divide-y divide-border overflow-hidden mb-3">
        {sorted.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{cat.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => deleteCategory(cat.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
