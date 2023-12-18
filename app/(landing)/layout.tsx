import { Navbar } from '@/components/navbar'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='container flex w-full flex-1 flex-col overflow-hidden'>
        {children}
      </main>
    </div>
  )
}
