'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/ui/button'
import { Close, PopoverClose } from '@radix-ui/react-popover'
import { MoreVertical, Trash, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DrawingProps {
  data: {
    prompt: string | null
    preview: string | null
    created_at: string
  }
}

const MoreAction = () => (
  <Popover>
    <PopoverTrigger asChild>
      <MoreVertical className='cursor-pointer' size={18} />
    </PopoverTrigger>
    <PopoverContent>
      <PopoverClose>
        <div className='flex gap-2 items-center hover:bg-[#eee] px-2 py-1 rounded-md cursor-pointer'>
          <Users size={14} />
          Make pubic
        </div>
      </PopoverClose>
      <Dialog>
        <DialogTrigger asChild>
          <div className='flex gap-2 items-center hover:bg-[#eee] px-2 py-1 rounded-md cursor-pointer text-red-800'>
            <Trash size={14} />
            Delete
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete the drawing?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              drawing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Close>
              <PopoverClose>
                <Button variant='destructive'>Delete</Button>
              </PopoverClose>
            </Close>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PopoverContent>
  </Popover>
)

export function Drawing({ data }: DrawingProps) {
  return (
    <Card className='w-full'>
      <CardContent>
        <div className='flex items-center justify-end'>
          <MoreAction />
        </div>
        <Image
          src={data?.preview || '/default.png'}
          alt=''
          className='h-[200px] w-auto'
          height={400}
          width={200}
        />
        <div className='flex items-center justify-between'>
          <p className='font-semibold text-xl flex-1'>{data.prompt}</p>
          <p className='text-sm text-muted-foreground'>4 days ago</p>
        </div>
      </CardContent>
    </Card>
  )
}
