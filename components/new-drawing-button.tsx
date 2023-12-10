'use client'

import React from 'react'
import { buttonVariants } from '@/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'

export function NewDrawingButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className={cn(buttonVariants(), {
        'cursor-not-allowed opacity-60': pending,
      })}
      type='submit'
      aria-disabled={pending}
    >
      {pending ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Plus className='mr-2 h-4 w-4' />
      )}
      New drawing
    </button>
  )
}
