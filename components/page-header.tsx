interface DashboardHeaderProps {
  title: string
  children?: React.ReactNode
}

export function PageHeader({ title, children }: DashboardHeaderProps) {
  return (
    <div className='flex items-center justify-between pr-2'>
      <div className='grid gap-1'>
        <h1 className='text-3xl font-bold md:text-4xl'>{title}</h1>
      </div>
      {children}
    </div>
  )
}
