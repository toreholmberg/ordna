import { BottomNav } from '@/components/app/BottomNav'
import { DebugPanel } from '@/components/app/DebugPanel'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto max-w-2xl px-4 py-4">{children}</div>
      </main>
      <BottomNav />
      <DebugPanel />
    </div>
  )
}
