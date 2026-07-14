import type { Metadata } from 'next'
import Image from 'next/image'
import { Star, Flame, Clock, MapPin, ChefHat } from 'lucide-react'
import { SiteShell } from '@/components/site/SiteShell'
import { SiteLinkButton } from '@/components/site/Button'
import { MenuCard } from '@/components/site/MenuCard'
import { prisma } from '@/lib/db'
import { BUSINESS_INFO, TESTIMONIALS, GALLERY_HIGHLIGHTS } from '@/lib/business'
import { featuredMockDishes } from '@/lib/mock-menu'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop&auto=format&q=75'

export const metadata: Metadata = {
  title: BUSINESS_INFO.name,
  description: BUSINESS_INFO.shortDesc,
}

async function getFeaturedDishes() {
  const products = await prisma.product.findMany({
    where: { status: 'active' },
    include: { variants: { where: { status: 'active' } }, category: true },
    take: 3,
    orderBy: { id: 'asc' },
  })
  if (products.length === 0) return featuredMockDishes()
  return products.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    basePrice: Number(p.basePrice),
    image: p.imageUrl,
    variants: p.variants.map(v => ({ id: v.id, name: v.name, price: Number(v.price) })),
    categoryName: p.category.name,
  }))
}

export default async function Home() {
  const featuredDishes = await getFeaturedDishes()

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Chef preparing food"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-(--site-cream)" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-28 sm:py-40 text-center relative">
          <p className="text-(--site-amber-light) font-semibold tracking-widest text-xs uppercase mb-4">
            Welcome to
          </p>
          <h1 className="font-(family-name:--font-display) text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
            {BUSINESS_INFO.name}
          </h1>
          <p className="text-white/85 max-w-xl mx-auto mb-10 leading-relaxed text-lg">
            {BUSINESS_INFO.shortDesc}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <SiteLinkButton href="/menu">View Menu</SiteLinkButton>
            <SiteLinkButton href="/book-a-table" variant="secondary" className="!text-white !border-white hover:!bg-white hover:!text-(--site-maroon)">
              Book a Table
            </SiteLinkButton>
          </div>

          <div className="flex items-center justify-center gap-1 mt-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-(--site-amber) text-(--site-amber)" />
            ))}
            <span className="ml-2 text-sm text-white/80">4.9 from 800+ happy guests</span>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="site-gradient-maroon">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
          {[
            { value: '12+', label: 'Years Serving' },
            { value: '50k+', label: 'Orders Delivered' },
            { value: '35+', label: 'Signature Dishes' },
            { value: '4.9★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-white/70 uppercase tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-[var(--site-amber-dark)] font-semibold tracking-widest text-xs uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--site-maroon)]">
            A Taste You&apos;ll Remember
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GALLERY_HIGHLIGHTS.map(item => (
            <div key={item.title} className="bg-white rounded-2xl border border-[var(--site-maroon)]/10 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative w-full aspect-4/3">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-3 -mt-11 relative shadow-sm border border-[var(--site-maroon)]/10">
                  <Flame size={16} className="text-[var(--site-amber-dark)]" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--site-maroon)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--site-ink)]/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured dishes */}
      <section className="site-gradient-hero">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-12">
            <p className="text-[var(--site-amber-dark)] font-semibold tracking-widest text-xs uppercase mb-3">
              Guest Favorites
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--site-maroon)]">
              Featured Dishes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredDishes.map(dish => (
              <MenuCard key={dish.id} product={{ ...dish, featured: true }} />
            ))}
          </div>
          <div className="text-center mt-10">
            <SiteLinkButton href="/menu" variant="secondary">See Full Menu</SiteLinkButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-[var(--site-amber-dark)] font-semibold tracking-widest text-xs uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--site-maroon)]">
            What Our Guests Say
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="bg-white rounded-2xl border border-[var(--site-maroon)]/10 p-6 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="fill-[var(--site-amber)] text-[var(--site-amber)]" />
                ))}
              </div>
              <p className="text-sm text-[var(--site-ink)]/75 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-[var(--site-maroon)]">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visit us CTA */}
      <section className="site-gradient-maroon">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-[var(--site-amber-light)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Visit Us</p>
              <p className="text-sm text-white/70">{BUSINESS_INFO.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-[var(--site-amber-light)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Opening Hours</p>
              {BUSINESS_INFO.hours.map(h => (
                <p key={h.day} className="text-sm text-white/70">{h.day}: {h.time}</p>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ChefHat size={20} className="text-[var(--site-amber-light)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Made Fresh</p>
              <p className="text-sm text-white/70">Every order cooked to order, never pre-made.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
