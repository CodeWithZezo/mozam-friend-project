import { cn } from '@/lib/utils'
import Link from 'next/link'

type Variant = 'primary' | 'secondary'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 px-6 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-[var(--site-maroon)] text-white hover:bg-[var(--site-maroon-dark)]',
  secondary: 'bg-transparent text-[var(--site-maroon)] border border-[var(--site-maroon)] hover:bg-[var(--site-maroon)] hover:text-white',
}

interface SiteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function SiteButton({ variant = 'primary', className, ...props }: SiteButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />
}

interface SiteLinkButtonProps {
  href: string
  variant?: Variant
  className?: string
  children: React.ReactNode
}

export function SiteLinkButton({ href, variant = 'primary', className, children }: SiteLinkButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  )
}
