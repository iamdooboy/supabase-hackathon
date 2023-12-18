'use client'

import React from 'react'
import { Label } from '@/ui/label'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { Eraser, Move, Pencil } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Slider } from './ui/slider'
import { Toggle } from './ui/toggle'

export function DrawingToolbar({
  setTool,
  isDrawing,
}: {
  setTool: React.Dispatch<React.SetStateAction<string>>
  isDrawing: React.MutableRefObject<boolean>
}) {
  return (
    <div className='fixed bottom-4 left-1/2 -translate-x-1/2'>
      <div className='bg-background mx-auto flex max-w-fit items-center justify-center gap-2 rounded-md border p-2 shadow-md'>
        <TooltipProvider>
          <Tooltip>
            <RadioGroup defaultValue='draw' className='grid grid-cols-2 gap-4'>
              <div>
                <RadioGroupItem
                  value='draw'
                  id='draw'
                  className='peer sr-only'
                />
                <Label
                  onClick={() => setTool('pen')}
                  htmlFor='draw'
                  className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md p-4 hover:bg-gray-200 peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
                >
                  {' '}
                  <Pencil className='h-5 w-5 text-black' />
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value='erase'
                  id='erase'
                  className='peer sr-only'
                />
                <Label
                  onClick={() => setTool('eraser')}
                  htmlFor='erase'
                  className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md p-4 hover:bg-gray-200 peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
                >
                  {' '}
                  <Eraser className='h-5 w-5 text-black' />
                </Label>
              </div>
            </RadioGroup>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
