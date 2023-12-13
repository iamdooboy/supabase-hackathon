'use client'

import React from 'react'
import { DrawingToolbar } from '@/drawing-toolbar'
import { Circle, Layer, Line, Rect, Stage, StageProps, Text } from 'react-konva'

function DrawingCanvas({ preview }: { preview: string }) {
  const [tool, setTool] = React.useState<string>('pen')
  const [lines, setLines] = React.useState<any[]>([])
  const isDrawing = React.useRef(false)

  const handleMouseDown = (e: any) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y] }])
  }

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    let lastLine = lines[lines.length - 1]
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    setLines(lines.concat())
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  return (
    <>
      <div className='flex-1 grid w-full bg-gray-200 min-h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] overflow-auto'>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          draggable={tool === 'grab'}
        >
          <Layer>
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
      <DrawingToolbar setTool={setTool} isDrawing={isDrawing}/>
    </>
  )
}

//need to export as default for Konva to work properly
export default DrawingCanvas
