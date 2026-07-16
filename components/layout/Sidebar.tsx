'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard, ShoppingCart, Package, Tag,
  Users, ArchiveX, BarChart2, LogOut, UtensilsCrossed,
  CalendarCheck, Mail, ShoppingBag
} from 'lucide-react'
import { useSidebar } from './SidebarContext'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Sales',
    items: [
      { href: '/orders', label: 'Orders', icon: ShoppingCart },
      { href: '/web-orders', label: 'Website Orders', icon: ShoppingBag },
      { href: '/reservations', label: 'Reservations', icon: CalendarCheck },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { href: '/products', label: 'Products', icon: Package },
      { href: '/inventory', label: 'Inventory', icon: ArchiveX },
      { href: '/categories', label: 'Categories', icon: Tag },
    ],
  },
  {
    label: 'People',
    items: [
      { href: '/customers', label: 'Customers', icon: Users },
      { href: '/messages', label: 'Messages', icon: Mail },
    ],
  },
  {
    label: 'Insights',
    items: [
      { href: '/reports', label: 'Reports', icon: BarChart2 },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, close } = useSidebar()
  const [lowStockCount, setLowStockCount] = useState(0)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then((products: { variants: { stock: number; lowStockThreshold: number }[] }[]) => {
        const count = products
          .flatMap(p => p.variants)
          .filter(v => v.stock <= v.lowStockThreshold).length
        setLowStockCount(count)
      })
      .catch(() => {})
  }, [pathname === '/products'])

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-surface-1 text-text-primary flex flex-col',
        'border-r border-border-subtle',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-spice-400 to-spice-500 shadow-sm shrink-0">
            <UtensilsCrossed size={19} className="text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm tracking-tight text-text-primary">Tymo</h1>
            <p className="text-[11px] text-text-muted mt-0.5">POS System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] uppercase tracking-widest text-text-muted px-3 mb-1.5 font-semibold">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href + '/'))
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                      active
                        ? 'bg-spice-500/15 text-spice-400 border-l-2 border-spice-400 pl-[10px]'
                        : 'text-text-secondary hover:bg-surface-2 hover:text-text-primary border-l-2 border-transparent pl-[10px]'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={17} className="shrink-0" />
                    <span className="font-medium">{label}</span>
                    {href === '/products' && lowStockCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">
                        {lowStockCount}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-border-subtle">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary transition-all duration-150 w-full"
        >
          <LogOut size={16} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
