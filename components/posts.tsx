import React from 'react'

import { Drawing } from './drawing'

interface Props {
  posts: {
    data:
      | {
          created_at: string
          created_by: string | null
          id: string
          preview_data: string | null
          privacy: string | null
          prompt: string | null
          user_id: string | null
        }[]
      | null
  }
}

export function Posts({ posts }: Props) {
  return (
    <div className='py-3 flex flex-col items-start md:grid md:grid-cols-3 gap-4'>
      {posts?.data?.length === 0 && (
        <p className='text-muted-foreground text-sm'>Start a new drawing!</p>
      )}
      {posts?.data?.map((drawing) => (
        <Drawing
          key={drawing.id}
          data={{
            prompt: drawing.prompt,
            created_at: drawing.created_at,
            preview: drawing.preview_data,
          }}
        />
      ))}
    </div>
  )
}
