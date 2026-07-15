'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { stiffness: 120, damping: 20 })
  const springY = useSpring(y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    // Only enable for fine pointers (desktop) and no reduced-motion preference
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    function move(e: MouseEvent) {
      x.set(e.clientX - 192)
      y.set(e.clientY - 192)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-30 h-96 w-96 rounded-full opacity-60 blur-3xl"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,oklch(0.62_0.19_258/0.18),transparent_60%)]" />
    </motion.div>
  )
}
