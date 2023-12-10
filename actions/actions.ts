'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'

import { toast } from '@/components/ui/use-toast'

export const signOut = async () => {
  const supabase = createServerActionClient({ cookies })
  await supabase.auth.signOut()
  redirect('/')
}

// export const signInGithub = async () => {
//   const supabase = createServerActionClient({ cookies })
//   await supabase.auth.signInWithOAuth({
//     provider: 'github',
//     options: {
//       redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
//     },
//   })
//   console.log('hello')
// }

// action.ts
export async function createNewDrawing() {
  'use server'
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase
    .from('drawings')
    .insert({
      prompt: 'apple',
      created_by: 'Duy Le',
      preview_data: 'blob:fasdfadfkagbibq3iubguqb3f',
    })
    .select()

  if (error) {
    return toast({
      title: 'Something went wrong.',
      description: 'Your post was not saved. Please try again.',
      variant: 'destructive',
    })
  }

  redirect(`/canvas/${data[0].id}`)
}
