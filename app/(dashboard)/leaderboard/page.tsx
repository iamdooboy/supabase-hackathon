import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PageHeader } from '@/components/page-header'

async function getUser() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data, error } = await supabase
    .from('points')
    .select('sum_points, users (id, email, full_name, avatar_url)')
    .order('sum_points', { ascending: false })

  return { data }
}

export default async function LeaderboardPage() {
  const { data } = await getUser()
  return (
    <>
      <PageHeader title='Leaderboard' />
      <div className='space-y-8'>
        {data?.map((list,index) => (
          <div key={index} className='flex items-center'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src={list.users.avatar_url} alt='Avatar' />
              <AvatarFallback>NO</AvatarFallback>
            </Avatar>
            <div className='ml-4 space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {' '}
                {list.users.full_name}
              </p>
            </div>
            <div className='ml-auto font-medium'>{list.sum_points}</div>
          </div>
        ))}
      </div>
    </>
  )
}
