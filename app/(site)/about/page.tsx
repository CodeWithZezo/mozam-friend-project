import Image from 'next/image'
import { Award, Heart, Leaf, Users } from 'lucide-react'
import { BUSINESS_INFO, TEAM, GALLERY_HIGHLIGHTS } from '@/lib/business'

const values = [
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'Sourced daily from trusted local farms and suppliers.' },
  { icon: Heart, title: 'Made with Care', desc: 'Every dish is prepared like it’s for our own family.' },
  { icon: Award, title: 'Consistent Quality', desc: 'Same great taste, every single visit, every single time.' },
  { icon: Users, title: 'Community First', desc: 'A gathering place for friends, families, and celebrations.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="site-gradient-hero site-texture">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-(--site-amber-dark) font-semibold tracking-widest text-xs uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-(family-name:--font-display) text-4xl sm:text-5xl font-bold text-(--site-maroon) mb-6">
            About {BUSINESS_INFO.name}
          </h1>
          <p className="text-(--site-ink)/70 text-lg leading-relaxed">
            {BUSINESS_INFO.name} started with a simple idea: serve honest, delicious food made
            fresh every day. What began as a small kitchen has grown into a neighborhood
            favorite, loved for its warm hospitality and consistent quality.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-5 text-(--site-ink)/80 leading-relaxed">
        <p>
          It all began over a decade ago in a tiny rented kitchen with just three ovens and a
          dream — to bring wood-fired, made-from-scratch food to our neighborhood. Our founder,
          Chef Imran, grew up watching his grandmother knead dough by hand every morning, and
          that same recipe still shapes every pizza base and bun we serve today.
        </p>
        <p>
          Over the years, {BUSINESS_INFO.name} has grown from a single counter to a full
          restaurant, but our philosophy hasn&apos;t changed: source it fresh, cook it slow, and
          serve it with a smile. Every sauce is simmered for hours, every dough proofed
          overnight, and every order treated like it&apos;s the most important one of the day.
        </p>
        <p>
          Today, we&apos;re proud to welcome families, friends, and first-time guests through our
          doors every single day — and we can&apos;t wait to welcome you too.
        </p>
      </section>

      {/* Values */}
      <section className="site-gradient-hero">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-(family-name:--font-display) text-3xl font-bold text-(--site-maroon)">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl border border-(--site-maroon)/10 p-6 text-center shadow-sm">
                <div className="w-11 h-11 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={18} className="text-(--site-amber-dark)" />
                </div>
                <h3 className="font-semibold text-(--site-maroon) mb-1.5">{v.title}</h3>
                <p className="text-sm text-(--site-ink)/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-(family-name:--font-display) text-3xl font-bold text-(--site-maroon)">
            Behind the Kitchen
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GALLERY_HIGHLIGHTS.map(item => (
            <div key={item.title} className="rounded-2xl overflow-hidden border border-(--site-maroon)/10">
              <div className="relative h-40">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="font-(family-name:--font-display) text-white text-lg">{item.title}</span>
                </div>
              </div>
              <div className="bg-white p-5">
                <p className="text-sm text-(--site-ink)/65 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="site-gradient-hero">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-(--site-amber-dark) font-semibold tracking-widest text-xs uppercase mb-3">
              Meet the Team
            </p>
            <h2 className="font-(family-name:--font-display) text-3xl font-bold text-(--site-maroon)">
              The People Behind the Food
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map(member => (
              <div key={member.name} className="bg-white rounded-2xl border border-(--site-maroon)/10 p-6 text-center shadow-sm">
                <div className="relative w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-(--site-amber-light)">
                  <Image src={member.image} alt={member.name} fill sizes="80px" className="object-cover" />
                </div>
                <h3 className="font-semibold text-(--site-maroon)">{member.name}</h3>
                <p className="text-xs text-(--site-amber-dark) font-medium uppercase tracking-wide mt-0.5 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-(--site-ink)/60 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit line */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-(--site-ink)/70">
          We&apos;d love to have you visit us at{' '}
          <span className="font-medium text-(--site-maroon)">{BUSINESS_INFO.address}</span>, or
          reach out anytime at{' '}
          <span className="font-medium text-(--site-maroon)">{BUSINESS_INFO.phone}</span>.
        </p>
      </section>
    </div>
  )
}
