import { BottomNav } from '@/components/app/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
