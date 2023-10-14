'use client'

import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { ApiList } from '@/components/ui/api-list'

import { ProductsColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

export function ProductClient({ data }: { data: ProductsColumn[] }) {
  const router = useRouter()
  const params = useParams()
  const productsCount = data.length

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${productsCount})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name' />
      <Heading title='API' description='API calls for products' />
      <Separator />
      <ApiList entityName='products' entityIdName='productId' />
    </>
  )
}
