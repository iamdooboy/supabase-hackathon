import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Paintbrush2 } from 'lucide-react'

import { getCurrentUser } from '@/lib/session'
import { UserAccountDropdown } from '@/components/user-account-dropdown'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return <div className='flex min-h-screen flex-col space-y-6 mx-auto '>dashboard</div>
}
