import { db } from '@/lib/db'
import { CategoryForm } from './components/category-form'

export default async function BillboardPage({
  params,
}: {
  params: { categoryId: string, storeId: string }
}) {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  })

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  )
}
