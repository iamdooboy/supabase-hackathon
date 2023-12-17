import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Database } from '@/types'
import {
  createServerComponentClient,
  User,
} from '@supabase/auth-helpers-nextjs'

import { getCurrentUser } from '@/lib/session'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

interface DashboardLayoutProps {
  explore?: React.ReactNode
  children?: React.ReactNode
}

const supabase = createServerComponentClient<Database>({ cookies })

// async function initializePoints(user: User) {
//   const { data, error } = await supabase
//     .from('points')
//     .insert({ user_id: user.id })
//     .select()
//   return data?.at(0).points
// }

// async function getPoints(user: User) {
//   try {
//     const { data } = await supabase
//       .from('points')
//       .select('points')
//       .eq('user_id', user.id)
//     return data
//     //return null
//   } catch (error) {
//     console.log(error)
//     return null
//   }
// }

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }


  // let points = await getPoints(user)
  // console.log(points?.at(0)?.points, '1')

// if (points === null || points === undefined) {
//   points = await initializePoints(user)
// }

// console.log(points, '2')

  return (
    <>
      <div className='flex min-h-screen flex-col space-y-6'>
        <Navbar points={0} user={user} />
        <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
          <Sidebar />
          <main className='flex-1'>
            <div className='flex min-h-screen flex-col space-y-6'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
