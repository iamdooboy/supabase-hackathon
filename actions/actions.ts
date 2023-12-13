'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'

import { getCurrentUser } from '@/lib/session'
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

  const user = await getCurrentUser()

  const supabase = createServerComponentClient({ cookies })
  const random = Math.floor(Math.random() * 101)
  const { data: promptData, error: promptError } = await supabase
    .from('drawing_prompts')
    .select('prompt')
    .eq('id', random)

  const { data, error } = await supabase
    .from('drawings')
    .insert({
      prompt: promptData?.at(0)?.prompt,
      created_by: user?.user_metadata.full_name,
      preview_data: 'blob:fasdfadfkagbibq3iubguqb3f',
    })
    .select()

  if (promptError) {
    throw new Error('something went wrong')
  }

  redirect(`/canvas/${data?.at(0).id}`)
}
