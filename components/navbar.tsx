import { cookies } from 'next/headers'
import Link from 'next/link'
import { buttonVariants } from '@/ui/button'
import { UserAccountDropdown } from '@/user-account-dropdown'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { Award, Paintbrush2 } from 'lucide-react'

import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Label } from './ui/label'

async function getPoints(user: User | undefined) {
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
  try {
    const { data } = await supabase
      .from('points')
      .select('sum_points')
      .eq('user_id', user?.id)
    if (data) return data?.at(0)?.sum_points
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function Navbar() {
  const user = await getCurrentUser()

  const points = await getPoints(user)

  return (
    <header className='sticky top-0 z-40 border-b bg-background'>
      <div className='container flex h-16 items-center justify-between py-4'>
        <div className='flex gap-6 md:gap-10'>
          <Link href='/' className='hidden items-center space-x-2 md:flex'>
            <Paintbrush2 />
            <span className='hidden font-bold sm:inline-block'>Draw</span>
          </Link>
        </div>

        {user ? (
          <div className='flex gap-4 justify-center items-center'>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='flex gap-1 items-center'>
                    <Award className='w-5 h-5' />
                    <Label className='text-lg'>{points}</Label>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your points</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <UserAccountDropdown
              user={{
                name: user?.user_metadata.full_name,
                image: user?.user_metadata.avatar_url,
                email: user?.user_metadata.email,
              }}
            />
          </div>
        ) : (
          <Link
            href='/login'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}
