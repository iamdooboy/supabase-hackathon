import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CanvasLayoutProps {
  children?: React.ReactNode
}

export default async function CanvasLayout({ children }: CanvasLayoutProps) {
  return <main className='flex min-h-screen flex-col'>{children}</main>
}
