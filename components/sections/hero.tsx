'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { MagneticButton } from '@/components/magnetic-button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-28 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for Embedded and Software engineer roles
          </span>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient">ASHHA G</span>
          </h1>

          <div className="mt-4 flex h-9 items-center font-mono text-lg text-muted-foreground sm:text-xl">
            <span className="mr-2 text-primary">{'>'}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-foreground"
              >
                {profile.roles[index]}
              </motion.span>
            </AnimatePresence>
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-primary" />
          </div>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" variant="primary">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail className="h-4 w-4" />
              Contact Me
            </MagneticButton>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <SocialLink href={profile.github} label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={profile.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={`mailto:${profile.email}`} label="Email">
              <Mail className="h-5 w-5" />
            </SocialLink>
          </div>
        </motion.div>

        {/* Right illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
    </section>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
    >
      {children}
    </a>
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
