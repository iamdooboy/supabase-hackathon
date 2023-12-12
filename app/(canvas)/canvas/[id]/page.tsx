import dynamic from 'next/dynamic'

import { DrawingToolbar } from '@/components/drawing-toolbar'

const DrawingCanvas = dynamic(
  () => import('@/components/drawing-canvas') as any,
  {
    ssr: false,
  }
)

export default async function DrawingPadPage({
  params,
}: {
  params: { slug: string }
}) {
  console.log(params)
  return (
    <div className='grid w-full bg-gray-200 min-h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] overflow-auto'>
      <DrawingToolbar>
        <DrawingCanvas />
      </DrawingToolbar>
    </div>
  )
}
