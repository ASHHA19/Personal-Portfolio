'use client'

import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/animations'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mx-auto max-w-2xl text-center ${className ?? ''}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
