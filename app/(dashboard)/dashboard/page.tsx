import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createNewDrawing } from '@/actions/actions'
import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'

import { getCurrentUser } from '@/lib/session'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DrawingCardList } from '@/components/drawing-card-list'
import { NewDrawingButton } from '@/components/new-drawing-button'
import { PageHeader } from '@/components/page-header'

export const metadata = {
  title: 'Dashboard',
}
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
    <>
      <PageHeader title='Drawings'>
        <form action={createNewDrawing}>
          <NewDrawingButton />
        </form>
      </PageHeader>
      <Tabs defaultValue='public'>
        <TabsList>
          <TabsTrigger value='public'>Public</TabsTrigger>
          <TabsTrigger value='private'>Private</TabsTrigger>
        </TabsList>
        <TabsContent value='public'>
          <DrawingCardList posts={publicPosts} />
        </TabsContent>
        <TabsContent value='private'>
          <DrawingCardList posts={privatePosts} />
        </TabsContent>
      </Tabs>
    </>
  )
}
