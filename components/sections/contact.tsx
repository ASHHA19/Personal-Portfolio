'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Mail, Send } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { profile } from '@/lib/portfolio-data'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status !== 'idle') return

    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const message = form.message.trim()

    if (!name || !email || !message) return

    setStatus('sending')
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      })

      if (!response.ok) {
        throw new Error('Unable to send your message right now.')
      }

      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
      window.setTimeout(() => {
        setStatus('idle')
        setError(null)
      }, 3000)
    } catch (err) {
      setStatus('error')
      setError('Unable to send your message right now. Please email me directly at ' + profile.email + '.')
    }
  }

  const contactChannels = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/ashha-g', href: profile.linkedin },
    { icon: GithubIcon, label: 'GitHub', value: 'github.com/ashha-g', href: profile.github },
  ]

  return (
    <section id="contact" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Open to Software Engineer and AI Engineer opportunities. Drop a message and I'll get back to you."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {contactChannels.map((c) => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="truncate text-sm text-foreground">{c.value}</p>
                  </div>
                </a>
              )
            })}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Jane Recruiter"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                placeholder="jane@company.com"
              />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                id="phone"
                label="Phone (optional)"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about the role or project..."
                className="w-full resize-none rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px] shadow-primary/60 transition-colors disabled:opacity-90"
            >
              {status === 'idle' && (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
              {status === 'sending' && (
                <>
                  Sending
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              )}
              {status === 'sent' && (
                <>
                  Message sent
                  <Check className="h-4 w-4" />
                </>
              )}
              {status === 'error' && 'Try again'}
            </motion.button>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            <p className="mt-3 text-xs text-muted-foreground">
              Messages will be sent to your email, and an SMS alert can be delivered if phone messaging is configured.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </div>
  )
}
