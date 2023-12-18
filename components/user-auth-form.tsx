'use client'

import * as React from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Github, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  const signInGithub = async () => {
    setIsGitHubLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background text-muted-foreground px-2'>
            Sign in with
          </span>
        </div>
      </div>
      <Button onClick={signInGithub} className='w-full'>
        {isGitHubLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <Github className='mr-2 h-4 w-4' />
        )}{' '}
        Github
      </Button>
    </div>
  )
}
