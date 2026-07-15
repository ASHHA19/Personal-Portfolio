import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PrintButton } from '@/components/print-button'
import {
  certifications,
  education,
  experiences,
  profile,
  skillGroups,
} from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of ASHHA G — Software & AI Engineer.',
}

export default function ResumePage() {
  return (
    <div className="min-h-svh bg-neutral-100 py-10 text-neutral-900 print:bg-white print:py-0">
      {/* Toolbar (hidden when printing) */}
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between px-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
        <PrintButton />
      </div>

      {/* Resume sheet */}
      <article className="mx-auto max-w-3xl bg-white px-8 py-10 shadow-xl print:max-w-none print:shadow-none sm:px-12">
        <header className="border-b-2 border-neutral-900 pb-5">
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-lg text-neutral-700">
            Software &amp; AI Engineer · Embedded Systems · Data Analytics
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-600">
            <span>{profile.email}</span>
            <span>{profile.linkedin.replace('https://www.', '')}</span>
            <span>{profile.github.replace('https://', '')}</span>
          </div>
        </header>

        <Section title="Summary">
          <p className="text-sm leading-relaxed text-neutral-700">{profile.tagline}</p>
        </Section>

        <Section title="Education">
          <p className="font-semibold">{education.degree}</p>
          <p className="text-sm text-neutral-700">{education.institution}</p>
          <p className="text-sm text-neutral-600">CGPA: {education.cgpa}</p>
        </Section>

        <Section title="Experience">
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={`${exp.role}-${exp.company}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold">{exp.role}</p>
                  <p className="shrink-0 text-xs text-neutral-500">{exp.period}</p>
                </div>
                <p className="text-sm text-neutral-700">{exp.company}</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-neutral-600">
                  {exp.responsibilities.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="mt-1 text-xs text-neutral-500">{exp.skills.join(' · ')}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Technical Skills">
          <div className="space-y-1.5">
            {skillGroups.map((group) => (
              <p key={group.title} className="text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">{group.title}: </span>
                {group.skills.join(', ')}
              </p>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <p className="text-sm text-neutral-700">
            {certifications.map((c) => c.title).join(' · ')}
          </p>
        </Section>
      </article>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  )
}
