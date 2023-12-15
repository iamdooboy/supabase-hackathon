import Image from 'next/image'

import { createTimeAgo } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface DrawingProps {
  data: {
    id: string | null
    prompt: string | null
    preview: string | null
    created_at: string
    create_by: string | null
  }
}

export function ExploreDrawingCard({ data }: DrawingProps) {
  return (
    <Card className='w-full'>
      <CardContent>
        <Image
          src={data?.preview || '/default.png'}
          alt=''
          className='h-[200px] w-auto'
          height={400}
          width={200}
        />
        <div className='space-y-1 mt-2'>
          <div className='font-semibold'>{data?.create_by}</div>
          <div className='text-sm text-muted-foreground'>
            {createTimeAgo(new Date(data?.created_at))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const test = (
  <div className='relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96'>
    <div className='relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96'>
      <img
        src='https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80'
        alt='card-image'
        className='object-cover w-full h-full'
      />
    </div>
    <div className='p-6'>
      <div className='flex items-center justify-between mb-2'>
        <p className='block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900'>
          Apple AirPods
        </p>
        <p className='block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900'>
          $95.00
        </p>
      </div>
      <p className='block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75'>
        With plenty of talk and listen time, voice-activated Siri access, and an
        available wireless charging case.
      </p>
    </div>
    <div className='p-6 pt-0'>
      <button
        className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
        type='button'
      >
        Add to Cart
      </button>
    </div>
  </div>
)
