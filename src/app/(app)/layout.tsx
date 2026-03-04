import { BottomNav } from '@/components/app/BottomNav'
import { SeedData } from '@/components/app/SeedData'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SeedData />
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto max-w-2xl px-4 py-4">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}
