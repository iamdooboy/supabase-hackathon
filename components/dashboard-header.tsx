interface DashboardHeaderProps {
  heading: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, children }: DashboardHeaderProps) {
  return (
    <div className='flex items-center justify-between px-2'>
      <div className='grid gap-1'>
        <h1 className='font-heading text-3xl md:text-4xl'>{heading}</h1>
      </div>
      {children}
    </div>
  )
}
