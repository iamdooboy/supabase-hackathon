'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CookieOptions, createServerClient } from '@supabase/ssr'
import { generateFromEmail } from 'unique-username-generator'

import { getCurrentUser } from '@/lib/session'

interface DrawingProps {
  id: string
  prompt: string | null
}

export const signOut = async () => {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
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
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
  const user = await getCurrentUser()



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
      preview_data: '',
    })
    .select()

  if (promptError) {
    throw new Error('something went wrong')
  }

  redirect(`/canvas/${data?.at(0).id}`)
}

export async function guessDrawing(
  drawingData: DrawingProps,
  inputData: FormData
) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
  const user = await getCurrentUser()
  const content = inputData.get('guess')
  if (drawingData.prompt !== content) {
    try {
      const { error } = await supabase.rpc('guess', {
        drawing_id: drawingData.id,
        user_id: user?.id,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export async function publishDrawing(drawing_id: string) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase
    .from('drawings')
    .update({
      privacy: 'public',
    })
    .eq('id', drawing_id)

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
