'use client'

import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { viewportOnce } from '@/lib/animations'
import { experiences } from '@/lib/portfolio-data'

function companyInitials(company: string) {
  return company
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Experience() {
  return (
    <section id="experience" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've applied my craft"
          description="A hands-on journey across embedded systems, firmware, IoT, and data analytics."
        />

        <div className="relative mt-14 pl-10 sm:pl-14">
          {/* Timeline spine */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-[18px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary via-accent/60 to-transparent sm:left-[26px]"
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Node */}
                <span className="absolute -left-[38px] top-4 flex h-7 w-7 items-center justify-center rounded-full border border-primary/50 bg-background shadow-[0_0_0_4px_hsl(var(--background))] transition-all group-hover:border-primary sm:-left-[54px]">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary transition-all group-hover:scale-125 group-hover:shadow-[0_0_12px_hsl(var(--primary))]" />
                </span>

                <div className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_-12px_hsl(var(--primary)/0.4)]">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Company logo placeholder */}
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/25 to-accent/15 font-mono text-sm font-bold text-primary">
                        {companyInitials(exp.company)}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold leading-tight">{exp.role}</h3>
                        <p className="text-sm text-primary">{exp.company}</p>
                      </div>
                    </div>

                    {/* Date badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                      <Briefcase className="h-3 w-3" />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-5 flex flex-col gap-2">
                    {exp.responsibilities.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary/90 transition-colors hover:border-primary/50 hover:bg-primary/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
