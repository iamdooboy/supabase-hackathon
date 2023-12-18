import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
      <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
        <h1 className='text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl'>
          Draw this and guess that.
        </h1>
        <p className='text-muted-foreground max-w-[42rem] leading-normal sm:text-xl sm:leading-8'>
          Draw an array of prompts and flex those guessing skills on what others are sketching. Earn points by
          guessing and climb the leaderboard!
        </p>
        <div className='space-x-4'>
          <Link href='/login' className={cn(buttonVariants({ size: 'lg' }))}>
            Get Started
          </Link>
          <Link
            href='/'
            target='_blank'
            rel='noreferrer'
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
