import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Admin Dashboard Register',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  )
}
