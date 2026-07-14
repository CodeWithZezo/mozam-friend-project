import type { Metadata } from 'next'
import { SiteShell } from '@/components/site/SiteShell'
import { BUSINESS_INFO } from '@/lib/business'

export const metadata: Metadata = {
  title: {
    default: BUSINESS_INFO.name,
    template: `%s · ${BUSINESS_INFO.name}`,
  },
  description: BUSINESS_INFO.shortDesc,
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
