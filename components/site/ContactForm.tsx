'use client'
import { useActionState } from 'react'
import { submitMessage, type FormState } from '@/app/(site)/actions'
import { SiteButton } from '@/components/site/Button'

const initialState: FormState = { success: false }

const fieldClass =
  'w-full rounded-lg border border-[var(--site-maroon)]/20 px-4 py-2.5 text-sm text-[var(--site-ink)] placeholder:text-[var(--site-ink)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--site-amber)]/40 focus:border-[var(--site-amber)] transition-colors bg-white'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitMessage, initialState)

  if (state.success) {
    return (
      <div className="rounded-xl bg-[var(--site-amber-light)]/30 border border-[var(--site-amber)]/30 p-6 text-center">
        <p className="font-medium text-[var(--site-maroon)]">Thank you! Your message has been sent.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Name</label>
        <input name="name" required className={fieldClass} placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Email</label>
        <input name="email" type="email" required className={fieldClass} placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--site-ink)] mb-1.5">Message</label>
        <textarea name="message" required rows={4} className={`${fieldClass} resize-none`} placeholder="How can we help?" />
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SiteButton type="submit" disabled={pending}>
        {pending ? 'Sending…' : 'Send Message'}
      </SiteButton>
    </form>
  )
}
