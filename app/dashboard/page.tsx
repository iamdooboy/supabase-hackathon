import { redirect } from 'next/navigation'
import { createNewDrawing } from '@/actions/actions'

import { getCurrentUser } from '@/lib/session'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from '@/components/dashboard-header'
import { NewDrawingButton } from '@/components/new-drawing-button'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <DashboardHeader heading='Drawings'>
        <form action={createNewDrawing}>
          <NewDrawingButton />
        </form>
      </DashboardHeader>
      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='account'>Drafts</TabsTrigger>
          <TabsTrigger value='password'>Published</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
