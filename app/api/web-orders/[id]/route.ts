import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { status } = await req.json()
  const order = await prisma.webOrder.update({
    where: { id: Number((await params).id) },
    data: { status },
  })
  return NextResponse.json(order)
}
