import Link from 'next/link'
import { buttonVariants } from '@/ui/button'
import { UserAccountDropdown } from '@/user-account-dropdown'
import { Paintbrush2 } from 'lucide-react'

import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'

export async function Navbar() {
  const user = await getCurrentUser()
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
          <UserAccountDropdown
            user={{
              name: user?.user_metadata.full_name,
              image: user?.user_metadata.avatar_url,
              email: user?.user_metadata.email,
            }}
          />
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
