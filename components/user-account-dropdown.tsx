'use client'

import Link from 'next/link'
import router from 'next/router'
import { signOut } from '@/actions/actions'
import { SignOut } from '@/sign-out'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Separator } from '@/ui/separator'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ChevronDown, UserRound } from 'lucide-react'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface UserAccountNavProps {
  user: {
    email: string | null
    image: string | null
    name: string | null
  }
}

export function UserAccountDropdown({ user }: UserAccountNavProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='flex gap-2 p-4' size='lg'>
          <Avatar className='h-8 w-8 text-sm'>
            <AvatarImage src={user.image!} />
            <AvatarFallback className='bg-primary text-white'>
              <UserRound className='h-4 w-4' />
            </AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
          <ChevronDown size={15} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <form action={signOut}>
          <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-1 leading-none'>
              {user.name && <p className='font-medium'>{user.name}</p>}
              {user.email && (
                <p className='text-sm text-muted-foreground'>{user.email}</p>
              )}
            </div>
          </div>
          <Separator className='mb-4 mt-2' />
          <SignOut />
        </form>
      </PopoverContent>
    </Popover>
  )
}
