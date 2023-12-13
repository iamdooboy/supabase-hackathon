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
    <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2'>
      <div className='flex gap-2 items-center justify-center max-w-fit shadow-md rounded-md p-2 border mx-auto bg-background'>
        <TooltipProvider>
          <Tooltip>
            <RadioGroup defaultValue='draw' className='grid grid-cols-3 gap-4'>
              <div>
                <RadioGroupItem
                  value='grab'
                  id='grab'
                  className='peer sr-only'
                />
                <TooltipTrigger asChild>
                  <Label
                    onClick={() => setTool('grab')}
                    htmlFor='grab'
                    className='flex flex-col hover:bg-gray-200 items-center justify-between rounded-md border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
                  >
                    <Move className='w-5 h-5 text-black' />
                  </Label>
                </TooltipTrigger>
                <TooltipContent>
                  <div className='grid gap-2 p-2'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='temperature'>Stroke Width</Label>
                      <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                        34
                      </span>
                    </div>
                    <Slider
                      id='temperature'
                      max={1}
                      step={0.1}
                      className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4'
                      aria-label='Temperature'
                    />
                  </div>
                </TooltipContent>
              </div>
              <div>
                <RadioGroupItem
                  value='draw'
                  id='draw'
                  className='peer sr-only'
                />
                <Label
                  onClick={() => setTool('pen')}
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
                  onClick={() => setTool('eraser')}
                  htmlFor='erase'
                  className='flex flex-col hover:bg-gray-200 items-center justify-between rounded-md border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-gray-200 [&:has([data-state=checked])]:bg-gray-200'
                >
                  {' '}
                  <Eraser className='w-5 h-5 text-black' />
                </Label>
              </div>
            </RadioGroup>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
