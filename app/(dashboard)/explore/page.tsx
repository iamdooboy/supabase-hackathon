import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Database } from '@/types'
import { createServerClient } from '@supabase/ssr'

import { getCurrentUser } from '@/lib/session'
import { ExploreDrawingCard } from '@/components/explore-drawing-card'
import { PageHeader } from '@/components/page-header'

export const metadata = {
  title: 'Explore',
}

async function getDrawings() {
  const cookieStore = cookies()

  const supabase = createServerClient<Database>(
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
  const { data, error } = await supabase
    .from('drawings')
    .select('*')
    .eq('privacy', 'public')

  return { data, error }
}

export default async function ExplorePage() {
  const drawings = await getDrawings()

  return (
    <>
      <PageHeader title='Explore' />
      <div className='flex flex-col items-start gap-4 py-3 md:grid md:grid-cols-3'>
        {drawings?.data?.map((drawing) => (
          <ExploreDrawingCard
            key={drawing.id}
            data={{
              id: drawing?.id,
              prompt: drawing?.prompt,
              created_at: drawing?.created_at,
              preview: drawing?.preview_data,
              created_by: drawing?.created_by,
            }}
          />
        ))}
      </div>
    </>
  )
}
