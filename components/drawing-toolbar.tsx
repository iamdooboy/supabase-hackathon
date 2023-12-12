'use client'

import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { Eraser, Move, Pencil } from 'lucide-react'

import { Label } from './ui/label'

interface DrawToolbarProps {
  children?: React.ReactNode
}

export function DrawingToolbar({ children }: DrawToolbarProps) {
  return (
    <div>
      {children}
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2'>
        <div className='flex gap-2 items-center justify-center max-w-fit shadow-md rounded-md p-2 border mx-auto bg-background'>
          <RadioGroup defaultValue='draw' className='grid grid-cols-3 gap-4'>
            <div>
              <RadioGroupItem value='grab' id='grab' className='peer sr-only' />
              <Label
                onClick={() => console.log('grab')}
                htmlFor='grab'
                className='flex flex-col hover:bg-gray-200 items-center justify-between rounded-md border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
              >
                <Move className='w-5 h-5 text-black' />
              </Label>
            </div>
            <div>
              <RadioGroupItem value='draw' id='draw' className='peer sr-only' />
              <Label
                onClick={() => console.log('draw')}
                htmlFor='draw'
                className='flex flex-col hover:bg-gray-200 items-center justify-between rounded-md border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
              >
                {' '}
                <Pencil className='w-5 h-5 text-black' />
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value='erase'
                id='erase'
                className='peer sr-only'
              />
              <Label
                onClick={() => console.log('erase')}
                htmlFor='erase'
                className='flex flex-col hover:bg-gray-200 items-center justify-between rounded-md border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
              >
                {' '}
                <Eraser className='w-5 h-5 text-black' />
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
