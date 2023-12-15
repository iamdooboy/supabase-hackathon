'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, PencilRuler, Trophy } from 'lucide-react'

import { cn } from '@/lib/utils'

const sidebarNav = [
  {
    title: 'Drawings',
    href: '/dashboard',
    icon: <PencilRuler className='mr-2 h-4 w-4' />,
  },
  {
    title: 'Explore',
    href: '/explore',
    icon: <Compass className='mr-2 h-4 w-4' />,
  },
  {
    title: 'Leaderboard',
    href: '/leaderboard',
    icon: <Trophy className='mr-2 h-4 w-4' />,
  },
]

export function Sidebar() {
  const path = usePathname()
  return (
    <aside className='hidden w-[200px] flex-col md:flex'>
      <nav className='grid items-start gap-2'>
        {sidebarNav.map((item, index) => (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                path === item.href ? 'bg-accent' : 'transparent'
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
