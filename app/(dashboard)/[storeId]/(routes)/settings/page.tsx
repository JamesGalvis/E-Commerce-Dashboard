import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { SettingsForm } from './components/settings-form'

interface SettingsPageProps {
  params: {
    storeId: string
  }
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  })

  if (!store) redirect("/")

  return (
    <div className='flex flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}