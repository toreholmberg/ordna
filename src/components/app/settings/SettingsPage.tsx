'use client'

import { Separator } from '@/components/ui/separator'
import { CategoryManager } from './CategoryManager'
import { RecurringItemManager } from './RecurringItemManager'

export function SettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Settings</h1>
      <div className="space-y-8">
        <CategoryManager />
        <Separator />
        <RecurringItemManager />
      </div>
    </div>
  )
}
