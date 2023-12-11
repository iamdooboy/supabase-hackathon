import { DrawingToolbar } from '@/components/drawing-toolbar'

export default async function DrawingPadPage({
  params,
}: {
  params: { slug: string }
}) {
  console.log(params)
  return (
    <div className='grid w-full bg-gray-200 min-h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] overflow-auto'>
      canvas page
      <DrawingToolbar>
        <div>canvas </div>
      </DrawingToolbar>
    </div>
  )
}
