import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CanvasLayoutProps {
  children?: React.ReactNode
}

export default async function CanvasLayout({ children }: CanvasLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-40 border-b bg-background'>
        <div className='flex h-16 items-center justify-between p-4'>
          <Link
            href='/dashboard'
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
          </Link>
          <div className='px-3'>
            <Label className='text-md opacity-80'>You are drawing&nbsp;</Label>
            <Label className='font-bold underline'>NARUTO EATING RAMEN</Label>
          </div>
          <div className='flex items-center gap-4'>
            <p className='text-sm text-muted-foreground'>Draft</p>
            <button type='submit' className={cn(buttonVariants())}>
              {/* {isSaving && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />} */}
              <span>Save</span>
            </button>
          </div>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
    </div>
  )
}
