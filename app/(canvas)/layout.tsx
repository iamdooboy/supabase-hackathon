interface CanvasLayoutProps {
  children?: React.ReactNode
}

export default async function CanvasLayout({ children }: CanvasLayoutProps) {
  return <main className='flex min-h-screen flex-col'>{children}</main>
}
