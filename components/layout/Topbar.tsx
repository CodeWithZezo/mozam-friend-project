'use client'

import { Menu } from 'lucide-react'
import { useSidebar } from './SidebarContext'

export default function Topbar({ title }: { title?: string }) {
  const { open } = useSidebar()

  return (
    <header className="h-16 bg-surface-1 border-b border-border-subtle flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={open}
          className="lg:hidden p-2 -ml-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <h2 className="text-xl font-semibold tracking-tight text-text-primary">{title}</h2>
      </div>
    </header>
  )
}
