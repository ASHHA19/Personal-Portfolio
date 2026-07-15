'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
  target?: string
  rel?: string
  ariaLabel?: string
  type?: 'button' | 'submit'
}

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_8px_30px_-8px] shadow-primary/50 hover:shadow-primary/70',
  outline:
    'border border-border bg-card/50 text-foreground backdrop-blur hover:border-primary/60 hover:bg-card/80',
  ghost: 'text-foreground hover:bg-card/60',
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  target,
  rel,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18 })
  const springY = useSpring(y, { stiffness: 250, damping: 18 })

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.3)
    y.set(relY * 0.3)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    variants[variant],
    className,
  )

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-flex"
      whileTap={{ scale: 0.96 }}
    >
      {href ? (
        <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
          {inner}
        </button>
      )}
    </motion.div>
  )
}
