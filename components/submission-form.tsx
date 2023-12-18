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
    guess_remaining: number | null
    user: User | null | undefined
    isSolved: boolean | null
  }
}

export function SubmissionForm({ data }: SubmissionProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [guessedWrong, setGuessedWrong] = React.useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guess: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const guessRemaining = data.guess_remaining
    const drawing_id = data.id
    const user_id = data.user?.id
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

    const updateSolved = await supabase
      .from('guess')
      .update({
        solved: true,
      })
      .eq('drawing_id', drawing_id)
      .eq('user_id', user_id)
      .select('guess_remaining')

    const updatePoints = await supabase.rpc('increment', {
      x: guessRemaining,
      row_id: user_id,
    })

    await Promise.all([updatePoints, updateSolved])
    router.refresh()
  }

  if (data.isSolved) {
    return (
      <Input
        value={data?.prompt!}
        readOnly
        className='font-medium focus-visible:ring-0 focus-visible:ring-offset-0'
      />
    )
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
      {guessedWrong && <FormMessage>Try again</FormMessage>}
    </Form>
  )
}
