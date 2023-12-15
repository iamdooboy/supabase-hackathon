import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { getCurrentUser } from '@/lib/session'
import { ExploreDrawingList } from '@/components/explore-drawing-list'
import { PageHeader } from '@/components/page-header'
import { ExploreDrawingCard } from '@/components/explore-drawing-card'

export const metadata = {
  title: 'Explore',
}

const supabase = createServerComponentClient<Database>({ cookies })

async function getDrawings() {
  const { data, error } = await supabase
    .from('drawings')
    .select('*')
    .eq('privacy', 'public')

  return { data, error }
}

export default async function ExplorePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }
  const drawings = await getDrawings()

  return (
    <>
      <PageHeader title='Explore' />
      <div className='py-3 flex flex-col items-start md:grid md:grid-cols-3 gap-4'>
        {drawings?.data?.map((drawing) => (
          <ExploreDrawingCard
            key={drawing.id}
            data={{
              id: drawing.id,
              prompt: drawing.prompt,
              created_at: drawing.created_at,
              preview: drawing.preview_data,
              create_by: drawing.created_by
            }}
          />
        ))}
      </div>
    </>
  )
}
