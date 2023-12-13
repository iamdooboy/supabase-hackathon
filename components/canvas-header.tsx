import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buttonVariants } from './ui/button'
import { Label } from './ui/label'

interface CanvasHeaderProps {
  info: {
    prompt: string
    privacy: string
  }
}

export function CanvasHeader({ info }: CanvasHeaderProps) {
  return (
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
          <Label className='text-md opacity-80'>Draw:&nbsp;</Label>
          <Label className='font-bold underline text-lg'>{info.prompt}</Label>
        </div>
        <div className='flex items-center gap-4'>
          <p className='text-sm text-muted-foreground'>{info.privacy}</p>
          <button type='submit' className={cn(buttonVariants())}>
            <span>Publish</span>
          </button>
        </div>
      </div>
    </header>
  )
}
