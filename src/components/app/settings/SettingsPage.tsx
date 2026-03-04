'use client'

import { Separator } from '@/components/ui/separator'
import { CategoryManager } from './CategoryManager'
import { RecurringItemManager } from './RecurringItemManager'

export function SettingsPage() {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Settings</h1>
      <div className="space-y-8">
        <CategoryManager />
        <Separator />
        <RecurringItemManager />
      </div>
    </div>
  )
}
