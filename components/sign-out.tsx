'use client'

import React, { useState } from 'react'
import { Button } from '@/ui/button'
import { Loader2 } from 'lucide-react'

export function SignOut() {
  const [isLoading, setIsloading] = useState(false)

  return (
    <Button disabled={isLoading} className='w-full gap-2'>
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
