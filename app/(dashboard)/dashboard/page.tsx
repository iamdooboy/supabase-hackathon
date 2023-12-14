import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createNewDrawing } from '@/actions/actions'
import { Database } from '@/types'
import {
  createServerComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs'

import { getCurrentUser } from '@/lib/session'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/dashboard-header'
import { NewDrawingButton } from '@/components/new-drawing-button'
import { Posts } from '@/components/posts'

export const metadata = {
  title: 'Dashboard',
}

const supabase = createServerComponentClient<Database>({ cookies })

async function getDrawings(privacy: string, user: User) {
  const { data, error } = await supabase
    .from('drawings')
    .select('*')
    .eq('user_id', user.id)
    .eq('privacy', privacy)

  return { data, error }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const privateData = await getDrawings('private', user)
  const publicData = await getDrawings('public', user)

  const [privatePosts, publicPosts] = await Promise.all([
    privateData,
    publicData,
  ])

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <DashboardHeader heading='Drawings'>
        <form action={createNewDrawing}>
          <NewDrawingButton />
        </form>
      </DashboardHeader>
      <Tabs defaultValue='private'>
        <TabsList>
          <TabsTrigger value='private'>Private</TabsTrigger>
          <TabsTrigger value='public'>Public</TabsTrigger>
        </TabsList>
        <TabsContent value='private'>
          <Posts posts={privatePosts} />
        </TabsContent>
        <TabsContent value='public'>
          <Posts posts={publicPosts} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
