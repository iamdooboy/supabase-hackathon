import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export async function getCurrentUser() {
  const supabase = createServerActionClient({ cookies })
  const { data } = await supabase.auth.getUser()
  return data?.user
}
