'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/actions/actions'
import { Button } from '@/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from 'lucide-react'

export function SignOut() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [isLoading, setIsloading] = useState(false)

  return (
    <Button disabled={isLoading} className='gap-2 w-full'>
      {isLoading ? (
        <>
          <Loader2 size={18} className='animate-spin' /> Signing out...
        </>
      ) : (
        'Sign out'
      )}
    </Button>
  )
}
