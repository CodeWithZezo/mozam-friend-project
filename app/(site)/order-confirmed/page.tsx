import { CheckCircle2, Clock, Phone } from 'lucide-react'
import { prisma } from '@/lib/db'
import { SiteLinkButton } from '@/components/site/Button'
import { BUSINESS_INFO } from '@/lib/business'
import { formatCurrency, formatDateTime } from '@/lib/utils'

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const orderId = id ? Number(id) : null
  const order = orderId
    ? await prisma.webOrder.findUnique({ where: { id: orderId }, include: { items: true } })
    : null

  return (
    <div className="site-gradient-hero min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-(--site-olive)/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={30} className="text-(--site-olive)" />
        </div>
        <h1 className="font-(family-name:--font-display) text-3xl sm:text-4xl font-bold text-(--site-maroon) mb-3">
          Order Confirmed!
        </h1>
        <p className="text-(--site-ink)/60 mb-8">
          {order
            ? `Thank you${order.customerName ? `, ${order.customerName}` : ''}! Your order has been received.`
            : 'Thank you! Your order has been received.'}
        </p>

        {order && (
          <div className="bg-white rounded-2xl border border-(--site-maroon)/10 p-6 text-left shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-(--site-maroon)/10">
              <div>
                <p className="text-xs text-(--site-ink)/50 uppercase tracking-wide">Order Number</p>
                <p className="font-(family-name:--font-display) text-lg font-semibold text-(--site-maroon)">
                  #{order.id.toString().padStart(4, '0')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-(--site-ink)/50 uppercase tracking-wide">Placed</p>
                <p className="text-sm text-(--site-ink)/70">{formatDateTime(order.createdAt)}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-(--site-ink)/70">
                    {item.quantity}&times; {item.productName} <span className="text-(--site-ink)/40">({item.variantName})</span>
                  </span>
                  <span className="text-(--site-ink) font-medium">{formatCurrency(Number(item.subtotal))}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-(--site-maroon)/10 space-y-1.5">
              <div className="flex justify-between text-sm text-(--site-ink)/70">
                <span>Subtotal</span>
                <span>{formatCurrency(Number(order.subtotal))}</span>
              </div>
              {Number(order.deliveryFee) > 0 && (
                <div className="flex justify-between text-sm text-(--site-ink)/70">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(Number(order.deliveryFee))}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-(--site-maroon)">
                <span>Total</span>
                <span>{formatCurrency(Number(order.total))}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-(--site-maroon)/10 p-5 flex items-center gap-3 text-left mb-8">
          <div className="w-10 h-10 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center shrink-0">
            <Clock size={16} className="text-(--site-amber-dark)" />
          </div>
          <p className="text-sm text-(--site-ink)/70">
            We&apos;ll call you shortly to confirm your order. For urgent queries, reach us at{' '}
            <span className="font-semibold text-(--site-maroon)">{BUSINESS_INFO.phone}</span>.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <SiteLinkButton href="/menu">Order More</SiteLinkButton>
          <SiteLinkButton href="/" variant="secondary">Back to Home</SiteLinkButton>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-xs text-(--site-ink)/40 mt-8">
          <Phone size={11} /> {BUSINESS_INFO.phone}
        </p>
      </div>
    </div>
  )
}
