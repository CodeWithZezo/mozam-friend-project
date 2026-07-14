'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flame, Phone, ShoppingBag, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SiteLinkButton } from '@/components/site/Button'
import { BUSINESS_INFO } from '@/lib/business'
import { useCart } from '@/components/site/CartContext'
import { openCart } from '@/components/site/CartDrawer'

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/book-a-table', label: 'Reservations' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <div className="site-gradient-maroon text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
          <span className="hidden sm:flex items-center gap-1.5 text-white/85">
            <Phone size={11} /> {BUSINESS_INFO.phone}
          </span>
          <span className="text-white/85 mx-auto sm:mx-0 truncate">{BUSINESS_INFO.tagline}</span>
        </div>
      </div>
      <header className="sticky top-0 z-30 bg-(--site-cream)/95 backdrop-blur-sm border-b border-(--site-maroon)/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 text-(--site-maroon) min-w-0">
            <Flame size={20} className="shrink-0" />
            <span className="font-(family-name:--font-display) text-base sm:text-lg font-bold truncate">
              {BUSINESS_INFO.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-sm font-medium transition-colors whitespace-nowrap',
                    active ? 'text-(--site-maroon)' : 'text-(--site-ink)/70 hover:text-(--site-maroon)'
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 rounded-full text-(--site-maroon) hover:bg-(--site-maroon)/10 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-(--site-amber) text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <SiteLinkButton href="/book-a-table" className="hidden sm:inline-flex text-xs sm:text-sm px-4 sm:px-6 py-2">
              Book a Table
            </SiteLinkButton>
            <button
              type="button"
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-full text-(--site-maroon) hover:bg-(--site-maroon)/10 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-(--site-maroon)/10 bg-(--site-cream) px-4 py-3 space-y-1 animate-slide-up">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    active ? 'bg-(--site-maroon)/10 text-(--site-maroon)' : 'text-(--site-ink)/70 hover:bg-(--site-maroon)/5'
                  )}
                >
                  {label}
                </Link>
              )
            })}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-(--site-ink)/70"
            >
              <Phone size={14} /> {BUSINESS_INFO.phone}
            </a>
          </nav>
        )}
      </header>
    </>
  )
}
