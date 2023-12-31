'use client'

import React from 'react'
import { DrawingToolbar } from '@/drawing-toolbar'
import { DrawingCanvasProps } from '@/types'
import { createBrowserClient } from '@supabase/ssr'
import { Layer, Line, Stage, StageProps } from 'react-konva'

import { OldDrawing } from './old-drawing'

let stage: StageProps

function DrawingCanvas({ data }: { data: DrawingCanvasProps }) {
  const [tool, setTool] = React.useState<string>('pen')
  const [lines, setLines] = React.useState<any[]>([])
  const isDrawing = React.useRef(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleMouseDown = (e: StageProps) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: StageProps) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = async () => {
    isDrawing.current = false
    if (stage) {
      const preview = stage?.toDataURL({ pixelRatio: 1 })
      try {
        await supabase
          .from('drawings')
          .update({ preview_data: preview })
          .eq('id', data.id)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className='grid max-h-[calc(100vh-65px)] min-h-[calc(100vh-65px)] w-full flex-1 overflow-auto bg-gray-200'>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            {data.preview && <OldDrawing preview={data?.preview} />}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke='#000'
                strokeWidth={20}
                tension={0.5}
                lineCap='round'
                lineJoin='round'
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <DrawingToolbar setTool={setTool} isDrawing={isDrawing} />
    </>
  )
}

//need to export as default for Konva to work properly
export default DrawingCanvas
