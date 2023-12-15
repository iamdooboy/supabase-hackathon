import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/lib/session'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className='flex min-h-screen flex-col space-y-6'>
      <Navbar />
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <Sidebar />
        <main className='flex-1'>
          <div className='flex min-h-screen flex-col space-y-6'>{children}</div>
        </main>
      </div>
    </div>
  )
}
