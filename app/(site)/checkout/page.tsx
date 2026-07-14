'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/site/CartContext'
import { SiteButton, SiteLinkButton } from '@/components/site/Button'
import { placeOrder } from '@/app/(site)/actions'
import { formatCurrency, cn } from '@/lib/utils'

const ORDER_TYPES = [
  { value: 'delivery', label: 'Delivery' },
  { value: 'takeaway', label: 'Takeaway' },
  { value: 'dine_in', label: 'Dine In' },
] as const

const fieldClass =
  'w-full rounded-lg border border-(--site-maroon)/20 px-4 py-2.5 text-sm text-(--site-ink) placeholder:text-(--site-ink)/40 focus:outline-none focus:ring-2 focus:ring-(--site-amber)/40 focus:border-(--site-amber) transition-colors bg-white'

export default function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart()
  const router = useRouter()

  const [orderType, setOrderType] = useState<typeof ORDER_TYPES[number]['value']>('delivery')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const deliveryFee = orderType === 'delivery' ? 150 : 0
  const total = subtotal + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const result = await placeOrder(
      { name, phone, email, address, orderType, notes },
      items.map(i => ({ variantId: i.variantId, quantity: i.quantity }))
    )
    setSubmitting(false)
    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      return
    }
    clear()
    router.push(`/order-confirmed?id=${result.orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="site-gradient-hero min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-14 h-14 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={22} className="text-(--site-amber-dark)" />
          </div>
          <h1 className="font-(family-name:--font-display) text-2xl font-semibold text-(--site-maroon) mb-2">
            Your cart is empty
          </h1>
          <p className="text-(--site-ink)/60 mb-6">Add some delicious items from our menu to get started.</p>
          <SiteLinkButton href="/menu">Browse Menu</SiteLinkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="site-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-(--site-amber-dark) font-semibold tracking-widest text-xs uppercase mb-3">
            Almost There
          </p>
          <h1 className="font-(family-name:--font-display) text-4xl font-bold text-(--site-maroon)">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Order summary */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-3">
            <h2 className="font-(family-name:--font-display) text-xl font-semibold text-(--site-maroon) mb-2">
              Order Summary
            </h2>
            {items.map(item => (
              <div key={item.variantId} className="flex gap-3 bg-white rounded-xl border border-(--site-maroon)/10 p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-(--site-ink) truncate">{item.productName}</p>
                  <p className="text-xs text-(--site-ink)/50">{item.variantName}</p>
                  <p className="text-xs text-(--site-amber-dark) font-semibold mt-1">{formatCurrency(item.unitPrice)}</p>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    className="text-(--site-ink)/30 hover:text-red-500 transition-colors"
                    aria-label={`Remove ${item.productName}`}
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-1.5 bg-(--site-cream) rounded-full px-1 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-(--site-maroon) hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-semibold text-(--site-ink) w-4 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-(--site-maroon) hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl border border-(--site-maroon)/10 p-4 space-y-2 mt-4">
              <div className="flex justify-between text-sm text-(--site-ink)/70">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-sm text-(--site-ink)/70">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-(--site-maroon) pt-2 border-t border-(--site-maroon)/10">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <Link href="/menu" className="block text-center text-sm text-(--site-maroon)/70 hover:text-(--site-maroon) mt-3">
              &larr; Add more items
            </Link>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 order-1 lg:order-2 bg-white rounded-2xl border border-(--site-maroon)/10 p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-(--site-ink) mb-2">Order Type</label>
                <div className="flex gap-2">
                  {ORDER_TYPES.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setOrderType(t.value)}
                      className={cn(
                        'flex-1 text-sm font-medium py-2.5 rounded-lg border transition-colors',
                        orderType === t.value
                          ? 'bg-(--site-maroon) border-(--site-maroon) text-white'
                          : 'border-(--site-maroon)/20 text-(--site-ink)/70 hover:border-(--site-maroon)/40'
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-(--site-ink) mb-1.5">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} required className={fieldClass} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--site-ink) mb-1.5">Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} required className={fieldClass} placeholder="03XX-XXXXXXX" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-(--site-ink) mb-1.5">
                  Email <span className="text-(--site-ink)/40 font-normal">(optional)</span>
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={fieldClass} placeholder="you@example.com" />
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-sm font-medium text-(--site-ink) mb-1.5">Delivery Address</label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    rows={2}
                    className={cn(fieldClass, 'resize-none')}
                    placeholder="House #, street, area, city"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-(--site-ink) mb-1.5">
                  Notes <span className="text-(--site-ink)/40 font-normal">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className={cn(fieldClass, 'resize-none')}
                  placeholder="Any special instructions?"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <SiteButton type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Placing Order…' : `Place Order · ${formatCurrency(total)}`}
              </SiteButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
