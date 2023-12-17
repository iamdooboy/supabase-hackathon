'use client'

import React from 'react'
import Image from 'next/image'
import { guessDrawing } from '@/actions/actions'
import { Loader2, Sparkles } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { createTimeAgo } from '@/lib/utils'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { createBrowserClient } from '@supabase/ssr'

interface DrawingProps {
  data: {
    id: string
    prompt: string | null
    preview: string | null
    created_at: string
    created_by: string | null
  }
}

export function ExploreDrawingCard({ data }: DrawingProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [showBanner, setShowBanner] = React.useState(false)
  const { pending } = useFormStatus()
  const guessDrawingWithId = guessDrawing.bind(null, {
    prompt: data.prompt,
    id: data.id,
  })

  const initialGuesses = async () => {
    const { data: userData } = await supabase.auth.getUser()

    try {
      const { data: guessData } = await supabase
        .from('guess')
        .select('id, guess_remaining')
        .eq('drawing_id', data.id)
        .eq('user_id', userData?.user?.id)

      if (guessData?.at(0)?.guess_remaining === 0) {
        setShowBanner(true)
      }

      if (guessData?.length! > 0) {
        return
      }

      await supabase.from('guess').insert({
        guess_remaining: 3,
        drawing_id: data.id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='w-full' onClick={initialGuesses}>
          <CardContent>
            <Image
              src={data?.preview || '/default.png'}
              alt=''
              className='h-[200px] w-auto'
              height={400}
              width={200}
            />
            <div className='space-y-1 mt-2'>
              <div className='font-semibold'>{data?.created_by}</div>
              <div className='text-sm text-muted-foreground'>
                {createTimeAgo(new Date(data?.created_at))}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Guess this drawing within 3 tries to earn points!
          </DialogTitle>

          {showBanner && (
            <Alert className='mt-4'>
              <Sparkles className='h-4 w-4' />
              <AlertTitle>You can't earn point for this drawing</AlertTitle>
            </Alert>
          )}
        </DialogHeader>
        <div className='border rounded-lg shadow-sm'>
          <Image
            src={data?.preview || '/default.png'}
            alt=''
            className='w-auto h-auto'
            height={500}
            width={500}
          />
        </div>
        <form action={guessDrawingWithId}>
          <div className='flex gap-3'>
            <Input
              required
              name='guess'
              placeholder='Enter your guess here'
              className='underline underline-offset-4 font-semibold text-lg'
            />
            <Button type='submit'>
              {pending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Submit
            </Button>
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
