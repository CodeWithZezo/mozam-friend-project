import { Clock, Users, CalendarCheck, Phone } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/business'
import { ReservationForm } from '@/components/site/ReservationForm'

const steps = [
  { icon: CalendarCheck, title: 'Pick a date & time', desc: 'Choose when you’d like to dine with us.' },
  { icon: Users, title: 'Tell us party size', desc: 'Let us know how many guests are joining.' },
  { icon: Clock, title: 'We confirm shortly', desc: 'Our team confirms your reservation within the hour.' },
]

export default function ReservationsPage() {
  return (
    <div className="site-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-(--site-amber-dark) font-semibold tracking-widest text-xs uppercase mb-3">
            Reserve Ahead
          </p>
          <h1 className="font-(family-name:--font-display) text-4xl sm:text-5xl font-bold text-(--site-maroon) mb-4">
            Book a Table
          </h1>
          <p className="text-(--site-ink)/60 max-w-lg mx-auto">
            Reserve your spot and we&apos;ll have a table ready for you — perfect for family
            dinners, dates, and celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl border border-(--site-maroon)/10 p-5 shadow-sm flex items-start gap-4">
                <div className="w-9 h-9 rounded-full site-gradient-maroon flex items-center justify-center shrink-0 text-white text-sm font-semibold">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--site-maroon) flex items-center gap-1.5">
                    <step.icon size={14} className="text-(--site-amber-dark)" /> {step.title}
                  </p>
                  <p className="text-sm text-(--site-ink)/60 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl overflow-hidden border border-(--site-maroon)/10 site-gradient-maroon p-6 text-white">
              <p className="font-(family-name:--font-display) text-lg mb-2">Prefer to call?</p>
              <p className="flex items-center gap-2 text-white/85 text-sm">
                <Phone size={14} /> {BUSINESS_INFO.phone}
              </p>
              <p className="text-white/70 text-xs mt-3">
                Large parties (10+) please call directly for the best availability.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-(--site-maroon)/10 p-8 shadow-sm">
            <h2 className="font-(family-name:--font-display) text-2xl font-semibold text-(--site-maroon) mb-6">
              Reservation Details
            </h2>
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
