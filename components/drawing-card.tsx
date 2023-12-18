'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/ui/button'
import { createBrowserClient } from '@supabase/ssr'
import { MoreVertical, Trash, Users } from 'lucide-react'

import { createTimeAgo } from '@/lib/utils'
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
    id: string | null
    prompt: string | null
    preview: string | null
    created_at: string
    privacy: string | null
  }
}

interface MoreActionProps {
  action: {
    privacy: string | null
    toggle: () => Promise<void>
    delete: () => Promise<void>
  }
}

export function DrawingCard({ data }: DrawingProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const router = useRouter()

  const privacy =
    data?.privacy === 'public' || !data?.privacy ? 'private' : 'public'

  const togglePrivacy = async (privacy: string | null) => {
    await supabase
      .from('drawings')
      .update({
        privacy,
      })
      .eq('id', data.id)
    router.refresh()
  }

  const deleteDrawing = async () => {
    await supabase.from('drawings').delete().eq('id', data.id)
    router.refresh()
  }

  return (
    <Card className='w-full'>
      <CardContent>
        <Link href={`/canvas/${data?.id}`}>
          <Image
            src={data?.preview || '/default.png'}
            alt=''
            className='h-[200px] w-auto'
            height={400}
            width={200}
          />
        </Link>
        <div className='flex items-center justify-between'>
          <div>
            <Link href={`/canvas/${data?.id}`}>
              <p className='flex-1 text-xl font-semibold'>{data.prompt}</p>
            </Link>
            <p className='text-muted-foreground text-sm'>
              {createTimeAgo(new Date(data?.created_at))}
            </p>
          </div>
          <MoreAction
            action={{
              privacy,
              toggle: () => togglePrivacy(privacy),
              delete: () => deleteDrawing(),
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function MoreAction({ action }: MoreActionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreVertical className='cursor-pointer' size={20} />
      </PopoverTrigger>
      <PopoverContent className='p-3'>
        <Button
          onClick={action.toggle}
          variant='ghost'
          className='flex items-center justify-start gap-2'
        >
          <Users size={14} />
          Make {action.privacy}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='ghost'
              className='flex w-full items-center justify-start gap-2 text-red-500 hover:text-red-700'
            >
              <Trash size={14} />
              Delete
            </Button>
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
              <Button onClick={action.delete} variant='destructive'>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  )
}
