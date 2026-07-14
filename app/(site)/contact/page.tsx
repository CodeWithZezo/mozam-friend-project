import { MapPin, Phone, Mail, Clock, AtSign, Share2 } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/business'
import { ContactForm } from '@/components/site/ContactForm'

export default function ContactPage() {
  return (
    <div className="site-gradient-hero">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-(--site-amber-dark) font-semibold tracking-widest text-xs uppercase mb-3">
            Get in Touch
          </p>
          <h1 className="font-(family-name:--font-display) text-4xl sm:text-5xl font-bold text-(--site-maroon) mb-4">
            Contact Us
          </h1>
          <p className="text-(--site-ink)/60 max-w-lg mx-auto">
            Questions, feedback, or a special request? Send us a message and our team will get
            back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-(--site-maroon)/10 p-6 shadow-sm space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-(--site-amber-dark)" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--site-maroon)">Address</p>
                  <p className="text-sm text-(--site-ink)/65 mt-0.5">{BUSINESS_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-(--site-amber-dark)" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--site-maroon)">Phone</p>
                  <p className="text-sm text-(--site-ink)/65 mt-0.5">{BUSINESS_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-(--site-amber-dark)" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--site-maroon)">Email</p>
                  <p className="text-sm text-(--site-ink)/65 mt-0.5">{BUSINESS_INFO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-(--site-amber-light)/30 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-(--site-amber-dark)" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--site-maroon)">Hours</p>
                  {BUSINESS_INFO.hours.map(h => (
                    <p key={h.day} className="text-sm text-(--site-ink)/65 mt-0.5">{h.day}: {h.time}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-(--site-maroon)/10 p-6 shadow-sm">
              <p className="text-sm font-semibold text-(--site-maroon) mb-3">Follow Us</p>
              <div className="flex gap-3">
                <span className="flex items-center gap-2 text-sm text-(--site-ink)/65">
                  <AtSign size={15} className="text-(--site-amber-dark)" /> {BUSINESS_INFO.social.instagram}
                </span>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="flex items-center gap-2 text-sm text-(--site-ink)/65">
                  <Share2 size={15} className="text-(--site-amber-dark)" /> {BUSINESS_INFO.social.facebook}
                </span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-(--site-maroon)/10 site-gradient-maroon h-40 flex items-center justify-center">
              <span className="text-white/80 text-sm flex items-center gap-2">
                <MapPin size={16} /> Find us on the map
              </span>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-(--site-maroon)/10 p-8 shadow-sm">
            <h2 className="font-(family-name:--font-display) text-2xl font-semibold text-(--site-maroon) mb-6">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
