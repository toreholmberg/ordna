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
      <h2 className="mb-3 text-sm font-medium">Categories</h2>
      <div className="bg-card divide-border mb-3 divide-y overflow-hidden rounded-lg border">
        {sorted.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">{cat.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive h-7 w-7"
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
