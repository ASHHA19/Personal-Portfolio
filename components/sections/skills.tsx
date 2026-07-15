'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/section-heading'
import { scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'
import { skillGroups } from '@/lib/portfolio-data'

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A versatile, full-spectrum toolkit"
          description="Languages, frameworks, and hardware platforms I use to design, build, and ship."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-primary/40"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100 sm:opacity-0" />
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary ring-1 ring-border transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold">{group.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
