'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Calendar, BookOpen, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/lists', label: 'Lists', Icon: ShoppingBag },
  { href: '/meal-plan', label: 'Meal Plan', Icon: Calendar },
  { href: '/recipes', label: 'Recipes', Icon: BookOpen },
  { href: '/settings', label: 'Settings', Icon: Settings },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-around px-2">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex min-w-[56px] flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
