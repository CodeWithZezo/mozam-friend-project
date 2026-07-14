'use client'
import { useActionState } from 'react'
import { submitReservation, type FormState } from '@/app/(site)/actions'
import { SiteButton } from '@/components/site/Button'

const initialState: FormState = { success: false }

const fieldClass =
  'w-full rounded-lg border border-[var(--site-maroon)]/20 px-4 py-2.5 text-sm text-[var(--site-ink)] placeholder:text-[var(--site-ink)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--site-amber)]/40 focus:border-[var(--site-amber)] transition-colors bg-white'

export function ReservationForm() {
  const [state, formAction, pending] = useActionState(submitReservation, initialState)

  if (state.success) {
    return (
      <div className="rounded-xl bg-[var(--site-amber-light)]/30 border border-[var(--site-amber)]/30 p-6 text-center">
        <p className="font-medium text-[var(--site-maroon)]">
          Your table has been requested! We&apos;ll confirm shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Name</label>
          <input name="name" required className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Phone</label>
          <input name="phone" required className={fieldClass} placeholder="03XX-XXXXXXX" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Email</label>
          <input name="email" type="email" required className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Guests</label>
          <input name="guests" type="number" min={1} required className={fieldClass} placeholder="2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Date</label>
          <input name="date" type="date" required className={fieldClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Time</label>
          <input name="time" type="time" required className={fieldClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">
          Special Requests <span className="text-[var(--site-ink)]/40 font-normal">(optional)</span>
        </label>
        <textarea name="notes" rows={3} className={`${fieldClass} resize-none`} placeholder="Anything we should know?" />
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SiteButton type="submit" disabled={pending}>
        {pending ? 'Booking…' : 'Book Table'}
      </SiteButton>
    </form>
  )
}
