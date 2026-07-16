'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, GraduationCap, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { aboutHighlights, aboutTraits, education } from '@/lib/portfolio-data'

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering intelligent systems, end to end"
          description="From silicon to software — I bridge hardware and AI to build products that work in the real world."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass rounded-3xl p-8"
          >
            <p className="text-pretty leading-relaxed text-muted-foreground">
              I&apos;m an Electronics and Communication Engineering graduate with hands-on
              experience spanning the full technology stack — from low-level embedded firmware
              to modern AI-powered applications. I enjoy turning complex problems into elegant,
              production-ready solutions.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              My work covers Software Development, Machine Learning, Image Processing, IoT, and
              Data Analytics, backed by a strong foundation in electronics and systems design.
            </p>

            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Hands-on experience
              </h3>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mt-4 flex flex-wrap gap-2"
              >
                {aboutHighlights.map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Floating illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="glass relative overflow-hidden rounded-3xl p-2"
            >
              <Image
                src="/hero-illustration.png"
                alt="Futuristic illustration of AI, code, and embedded systems"
                width={640}
                height={640}
                priority
                className="h-auto w-full rounded-2xl"
              />
            </motion.div>

            <FloatingChip className="left-2 top-8" delay={0}>
              AI / ML
            </FloatingChip>
            <FloatingChip className="right-2 top-24" delay={1.2}>
              Embedded C
            </FloatingChip>
            <FloatingChip className="bottom-10 left-0" delay={0.6}>
              Python
            </FloatingChip>
          </motion.div>
        </div>

        {/* What drives me + Education */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">What drives me</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {aboutTraits.map((trait) => (
                <li key={trait} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            <p className="mt-4 font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted-foreground">{education.institution}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 font-mono text-sm">
              <span className="text-muted-foreground">CGPA</span>
              <span className="text-gradient font-semibold">{education.cgpa}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FloatingChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className?: string
  delay: number
}) {
  return (
    <motion.span
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`glass absolute rounded-full px-3 py-1.5 font-mono text-xs text-foreground shadow-lg ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}
