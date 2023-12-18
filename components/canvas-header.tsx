import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/ui/button'
import { ArrowLeft } from 'lucide-react'
import { publishDrawing } from '@/actions/actions'

import { cn } from '@/lib/utils'

import { Label } from './ui/label'

interface CanvasHeaderProps {
  drawing: {
    id: string
    prompt: string
    privacy: string
  }
}

export function CanvasHeader({ drawing }: CanvasHeaderProps) {

  const publishDrawingById = publishDrawing.bind(null, drawing?.id)

  return (
    <header className='bg-background sticky top-0 z-40 border-b'>
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
          <Label className='text-lg font-bold underline'>{drawing.prompt}</Label>
        </div>
        <form action={publishDrawingById} className='flex items-center gap-4'>
          <p className='text-muted-foreground text-sm'>{drawing.privacy}</p>
          <Button type='submit'>
            Publish
          </Button>
        </form>
      </div>
    </header>
  )
}
