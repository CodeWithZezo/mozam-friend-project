import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { CartProvider } from '@/components/site/CartContext'
import { CartDrawer } from '@/components/site/CartDrawer'

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="site-theme min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
