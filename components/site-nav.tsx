'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5',
          scrolled
            ? 'glass shadow-lg shadow-black/30'
            : 'border border-transparent bg-transparent',
        )}
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            AG
          </span>
          <span className="hidden sm:inline">ASHHA G</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
                  active === link.href && 'text-foreground',
                )}
              >
                {active === link.href ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-card/80 ring-1 ring-border"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                ) : null}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_30px_-8px] shadow-primary/50 transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass absolute inset-x-4 top-[68px] rounded-2xl p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-card/70 hover:text-foreground',
                      active === link.href && 'bg-card/70 text-foreground',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-1 border-t border-border pt-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
