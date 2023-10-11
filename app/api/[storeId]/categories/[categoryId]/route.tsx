import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId)
      return new NextResponse('Category ID is required', { status: 400 })

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    const { name, billboardId } = await req.json()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!name) return new NextResponse('Name is required', { status: 400 })
    if (!billboardId)
      return new NextResponse('Billboard ID is required', { status: 400 })
    if (!params.storeId)
      return new NextResponse('Store ID is required', { status: 400 })

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

    const category = await db.category.updateMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!params.storeId)
      return new NextResponse('Store ID is required', { status: 400 })
    if (!params.categoryId)
      return new NextResponse('Category ID is required', { status: 400 })

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) return new NextResponse('Unauthorized', { status: 403 })

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
