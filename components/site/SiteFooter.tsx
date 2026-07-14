import Link from 'next/link'
import { Flame, MapPin, Phone, Mail, AtSign, Share2 } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/business'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/book-a-table', label: 'Reservations' },
]

export function SiteFooter() {
  return (
    <footer className="site-gradient-maroon text-white mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={20} />
            <p className="font-(family-name:--font-display) text-xl font-bold">{BUSINESS_INFO.name}</p>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">{BUSINESS_INFO.shortDesc}</p>
          <div className="flex gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-xs text-white/70">
              <AtSign size={13} /> {BUSINESS_INFO.social.instagram}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/70">
              <Share2 size={13} /> {BUSINESS_INFO.social.facebook}
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-3">Quick Links</p>
          <ul className="space-y-2">
            {quickLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-1">Get in Touch</p>
          <p className="flex items-start gap-2 text-sm text-white/70">
            <MapPin size={14} className="shrink-0 mt-0.5" /> {BUSINESS_INFO.address}
          </p>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <Phone size={14} /> {BUSINESS_INFO.phone}
          </p>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <Mail size={14} /> {BUSINESS_INFO.email}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 text-center">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
