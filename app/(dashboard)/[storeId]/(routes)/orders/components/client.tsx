'use client'

import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

export function OrderClient({ data }: { data: OrderColumn[] }) {
  const ordersCount = data.length

  return (
    <>
      <Heading
        title={`Orders (${ordersCount})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  )
}
