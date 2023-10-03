import { UserButton, auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

import { ModeToggle } from '@/components/mode-toggle'
import { MainNav } from '@/components/main-nav'
import { StoreSwitcher } from '@/components/store-switcher'

export async function Navbar() {
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="flex items-center space-x-4 ml-auto">
          <ModeToggle />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </div>
  )
}
