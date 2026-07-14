'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/components/site/CartContext'
import { SiteLinkButton } from '@/components/site/Button'
import { formatCurrency, cn } from '@/lib/utils'

export function CartDrawer() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handler() { setOpen(true) }
    window.addEventListener('open-cart', handler)
    return () => window.removeEventListener('open-cart', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm bg-(--site-cream) h-full flex flex-col shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between px-5 h-16 border-b border-(--site-maroon)/10 shrink-0">
              <h2 className="font-(family-name:--font-display) text-lg font-semibold text-(--site-maroon)">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-(--site-ink)/50 hover:text-(--site-ink) hover:bg-black/5 transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center">
                    <ShoppingBag size={22} className="text-(--site-amber-dark)" />
                  </div>
                  <p className="text-sm text-(--site-ink)/60">Your cart is empty.</p>
                  <SiteLinkButton href="/menu" variant="secondary" className="mt-2">
                    Browse Menu
                  </SiteLinkButton>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.variantId} className="flex gap-3 bg-white rounded-xl border border-(--site-maroon)/10 p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-(--site-ink) truncate">{item.productName}</p>
                        <p className="text-xs text-(--site-ink)/50">{item.variantName}</p>
                        <p className="text-xs text-(--site-amber-dark) font-semibold mt-1">
                          {formatCurrency(item.unitPrice)}
                        </p>
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
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-(--site-maroon)/10 p-5 shrink-0 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-(--site-ink)/60">Subtotal</span>
                  <span className="font-semibold text-(--site-ink)">{formatCurrency(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 px-6 py-3 text-sm',
                    'bg-(--site-maroon) text-white hover:bg-(--site-maroon-dark)'
                  )}
                >
                  Checkout &middot; {formatCurrency(subtotal)}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export function openCart() {
  window.dispatchEvent(new Event('open-cart'))
}
