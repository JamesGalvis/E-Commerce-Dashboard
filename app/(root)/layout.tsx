import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Create Store',
}

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const store = await db.store.findFirst({
    where: {
      userId,
    },
  })

  if (store) redirect(`/${store?.id}`)

  return <>{children}</>
}
