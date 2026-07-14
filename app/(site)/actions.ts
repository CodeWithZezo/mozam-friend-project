'use server'
import { prisma } from '@/lib/db'

export type FormState = { success: boolean; error?: string }

export async function submitReservation(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const date = String(formData.get('date') ?? '').trim()
  const time = String(formData.get('time') ?? '').trim()
  const guests = Number(formData.get('guests') ?? 0)
  const notes = String(formData.get('notes') ?? '').trim()

  if (!name || !email || !phone || !date || !time) {
    return { success: false, error: 'Please fill in all required fields.' }
  }
  if (!guests || guests < 1) {
    return { success: false, error: 'Please enter a valid number of guests.' }
  }

  const reservationDate = new Date(date)
  if (Number.isNaN(reservationDate.getTime())) {
    return { success: false, error: 'Please enter a valid date.' }
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (reservationDate < today) {
    return { success: false, error: 'Reservation date cannot be in the past.' }
  }

  await prisma.reservation.create({
    data: { name, email, phone, date: reservationDate, time, guests, notes: notes || null },
  })

  return { success: true }
}

export type CartItemInput = {
  variantId: number
  quantity: number
}

export type PlaceOrderState = { success: boolean; error?: string; orderId?: number }

export async function placeOrder(
  customer: { name: string; phone: string; email?: string; address?: string; orderType: string; notes?: string },
  cartItems: CartItemInput[]
): Promise<PlaceOrderState> {
  const name = customer.name.trim()
  const phone = customer.phone.trim()
  const orderType = customer.orderType

  if (!name || !phone) {
    return { success: false, error: 'Please provide your name and phone number.' }
  }
  if (orderType === 'delivery' && !customer.address?.trim()) {
    return { success: false, error: 'Please provide a delivery address.' }
  }
  if (cartItems.length === 0) {
    return { success: false, error: 'Your cart is empty.' }
  }

  const variantIds = cartItems.map(i => i.variantId)
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds }, status: 'active' },
    include: { product: true },
  })

  if (variants.length !== new Set(variantIds).size) {
    return { success: false, error: 'Some items in your cart are no longer available. Please refresh the menu and try again.' }
  }

  const variantMap = new Map(variants.map(v => [v.id, v]))
  let subtotal = 0
  const itemsData = cartItems.map(item => {
    const variant = variantMap.get(item.variantId)!
    const unitPrice = Number(variant.price)
    const lineSubtotal = unitPrice * item.quantity
    subtotal += lineSubtotal
    return {
      variantId: variant.id,
      productName: variant.product.name,
      variantName: variant.name,
      quantity: item.quantity,
      unitPrice,
      subtotal: lineSubtotal,
    }
  })

  const deliveryFee = orderType === 'delivery' ? 150 : 0
  const total = subtotal + deliveryFee

  const order = await prisma.webOrder.create({
    data: {
      customerName: name,
      customerPhone: phone,
      customerEmail: customer.email?.trim() || null,
      address: customer.address?.trim() || null,
      orderType: orderType as 'dine_in' | 'takeaway' | 'delivery',
      subtotal,
      deliveryFee,
      total,
      notes: customer.notes?.trim() || null,
      items: { create: itemsData },
    },
  })

  return { success: true, orderId: order.id }
}

export async function submitMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all fields.' }
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  await prisma.message.create({ data: { name, email, message } })

  return { success: true }
}
