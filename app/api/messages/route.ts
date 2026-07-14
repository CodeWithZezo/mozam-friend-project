import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(messages)
}
