'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { certifications } from '@/lib/portfolio-data'

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning, certified"
          description="Credentials that reinforce my expertise across hardware, security, and data."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className="glass group flex items-center gap-4 rounded-2xl p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary ring-1 ring-border transition-transform group-hover:scale-110">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold leading-tight">{cert.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
