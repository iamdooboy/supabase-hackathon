'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerActionClient, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
