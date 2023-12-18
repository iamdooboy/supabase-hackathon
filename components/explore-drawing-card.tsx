'use client'

import React from 'react'
import Image from 'next/image'
import { SubmissionForm } from '@/submission-form'
import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { Sparkles } from 'lucide-react'

import { createTimeAgo } from '@/lib/utils'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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

  const [isSolved, setIsSolved] = React.useState(false)
  const [showBanner, setShowBanner] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<User | null>()

  const initializeGuess = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const { user } = userData
    setCurrentUser(user)

    const { data: guessData } = await supabase
      .from('guess')
      .select('id, guess_remaining, solved')
      .eq('drawing_id', data.id)
      .eq('user_id', userData?.user?.id)

    setIsSolved(guessData?.at(0)?.solved)

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
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='w-full cursor-pointer' onClick={initializeGuess}>
          <CardContent>
            <Image
              src={data?.preview || '/default.png'}
              alt=''
              className='h-[200px] w-auto'
              height={400}
              width={200}
            />
            <div className='mt-2 space-y-1'>
              <div className='font-semibold'>{data?.created_by}</div>
              <div className='text-muted-foreground text-sm'>
                {createTimeAgo(new Date(data?.created_at))}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isSolved
              ? 'You already guessed this drawing!'
              : 'Guess this drawing within 3 tries to earn points!'}
          </DialogTitle>
          {showBanner && (
            <Alert className='mt-4'>
              <Sparkles className='h-4 w-4' />
              <AlertTitle>You can&apos;t earn point for this drawing</AlertTitle>
            </Alert>
          )}
        </DialogHeader>
        <div className='rounded-lg border shadow-sm'>
          <Image
            src={data?.preview || '/default.png'}
            alt=''
            className='h-auto w-auto'
            height={500}
            width={500}
          />
        </div>
        <SubmissionForm
          data={{
            prompt: data?.prompt,
            id: data?.id,
            user: currentUser,
            isSolved: isSolved,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
