'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBrowserClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  guess: z
    .string()
    .min(3, {
      message: 'Guess must be at least 3 characters.',
    })
    .max(20),
})

interface SubmissionProps {
  data: {
    id: string | null
    prompt: string | null
    user: User | null | undefined
    isSolved: boolean | null
  }
}

export function SubmissionForm({ data }: SubmissionProps) {
  if (data.isSolved) {
    return (
      <Input
        value={data?.prompt!}
        readOnly
        className='font-medium focus-visible:ring-0 focus-visible:ring-offset-0'
      />
    )
  }
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [solved, setSolved] = React.useState(false)
  const [guessedWrong, setGuessedWrong] = React.useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guess: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const drawing_id = data.id
    const user_id = data?.user?.id
    const prompt = data.prompt

    if (prompt !== values.guess) {
      setGuessedWrong(true)
      const { error } = await supabase.rpc('guess', {
        drawing_id,
        user_id,
      })

      if (error) {
        throw new Error('Something went wrong' + error)
      }
      return
    }

    setSolved(true)
    const updateSolved = await supabase
      .from('guess')
      .update({
        solved: true,
      })
      .eq('drawing_id', drawing_id)
      .eq('user_id', user_id)
      .select('guess_remaining')

    const updatePoints = await supabase.rpc('increment_points', {
      earned_points: updateSolved?.data?.at(0)?.guess_remaining,
      row_id: user_id,
    })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex gap-3 items-center w-full'
      >
        <FormField
          control={form.control}
          name='guess'
          render={({ field }) => (
            <FormItem className='w-full flex items-center justify-around gap-3'>
              <FormControl>
                <Input
                  onFocus={() => setGuessedWrong(false)}
                  placeholder='Enter your guess here'
                  {...field}
                />
              </FormControl>
              <Button disabled={form.formState.isSubmitting} type='submit'>
                {form.formState.isSubmitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Submit
              </Button>
            </FormItem>
          )}
        />
      </form>
      {solved && <FormMessage className='text-green-600'>Correct!</FormMessage>}
      {guessedWrong && <FormMessage>Try again</FormMessage>}
    </Form>
  )
}
