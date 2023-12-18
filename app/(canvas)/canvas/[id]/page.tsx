import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { DrawingCanvasProps } from '@/types'
import { createServerClient } from '@supabase/ssr'

import { CanvasHeader } from '@/components/canvas-header'

const DrawingCanvas = dynamic<{ data: DrawingCanvasProps }>(
  () => import('@/components/drawing-canvas') as any,
  {
    ssr: false,
  }
)

export default async function DrawingPadPage({
  params,
}: {
  params: { id: string }
}) {
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
  const { data } = await supabase
    .from('drawings')
    .select('*')
    .eq('id', params?.id)

  return (
    <>
      <CanvasHeader
        drawing={{
          id: data?.at(0).id,
          prompt: data?.at(0).prompt,
          privacy: data?.at(0).privacy,
        }}
      />
      <DrawingCanvas
        data={{
          preview: data?.at(0).preview_data,
          id: data?.at(0).id,
        }}
      />
    </>
  )
}
