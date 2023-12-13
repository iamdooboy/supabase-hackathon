import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { DrawingCanvasProps } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { CanvasHeader } from '@/components/canvas-header'
import { DrawingToolbar } from '@/components/drawing-toolbar'

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
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase
    .from('drawings')
    .select('*')
    .eq('id', params?.id)

  return (
    <>
      <CanvasHeader
        info={{
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
