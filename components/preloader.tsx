'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const bootLines = [
  'POST: microcontroller OK',
  'mount /dev/ai · /dev/vision',
  'flashing firmware · embedded core',
  'linking neural modules',
  'system ready',
]

export function Preloader() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const [line, setLine] = useState(0)

  useEffect(() => {
    const total = 2200
    const start = performance.now()
    let raf = 0

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total)
      setProgress(p)
      setLine(Math.min(bootLines.length - 1, Math.floor(p * bootLines.length)))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
        >
          {/* Ambient board glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(40% 40% at 50% 42%, oklch(0.62 0.19 258 / 0.22), transparent 70%), radial-gradient(30% 30% at 50% 42%, oklch(0.6 0.2 292 / 0.18), transparent 70%)',
            }}
          />

          {/* Chip + circuit graphic */}
          <div className="relative flex items-center justify-center">
            <svg
              width="240"
              height="240"
              viewBox="0 0 240 240"
              fill="none"
              className="text-primary"
              aria-hidden
            >
              {/* Traces radiating from the chip to the pads */}
              {[
                'M120 92 V44 M120 44 H80 M120 44 H160',
                'M120 148 V196 M120 196 H80 M120 196 H160',
                'M92 120 H44 M44 120 V84 M44 120 V156',
                'M148 120 H196 M196 120 V84 M196 120 V156',
              ].map((d, idx) => (
                <motion.path
                  key={idx}
                  d={d}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-40"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.45 }}
                  transition={{ duration: 1, delay: idx * 0.12, ease: 'easeInOut' }}
                />
              ))}

              {/* Solder pads with a pulsing glow */}
              {[
                [80, 44],
                [160, 44],
                [80, 196],
                [160, 196],
                [44, 84],
                [44, 156],
                [196, 84],
                [196, 156],
              ].map(([cx, cy], idx) => (
                <motion.circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: 1 }}
                  transition={{
                    opacity: { duration: 1.8, repeat: Infinity, delay: idx * 0.15 },
                    scale: { duration: 0.4, delay: 0.5 + idx * 0.08 },
                  }}
                />
              ))}

              {/* Chip pin ticks */}
              {Array.from({ length: 4 }).map((_, i) => {
                const off = 96 + i * 16
                return (
                  <g key={i} className="opacity-60" stroke="currentColor" strokeWidth="2">
                    <line x1="84" y1={off} x2="92" y2={off} />
                    <line x1="148" y1={off} x2="156" y2={off} />
                    <line x1={off} y1="84" x2={off} y2="92" />
                    <line x1={off} y1="148" x2={off} y2="156" />
                  </g>
                )
              })}

              {/* Chip body */}
              <motion.rect
                x="92"
                y="92"
                width="56"
                height="56"
                rx="10"
                className="fill-card"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: '120px 120px' }}
              />

              {/* Rotating scan ring around the chip */}
              <motion.circle
                cx="120"
                cy="120"
                r="46"
                stroke="url(#scan)"
                strokeWidth="2"
                strokeDasharray="60 220"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '120px 120px' }}
              />
              <defs>
                <linearGradient id="scan" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.16 258)" />
                  <stop offset="100%" stopColor="oklch(0.68 0.2 292)" />
                </linearGradient>
              </defs>
            </svg>

            {/* AG logo centered on the chip */}
            <span className="absolute font-mono text-2xl font-bold text-gradient">AG</span>
          </div>

          {/* Initializing label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            Initializing
          </motion.p>

          {/* Boot log line */}
          <div className="mt-4 h-4 font-mono text-[11px] text-primary/80">
            <AnimatePresence mode="wait">
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {'> '}
                {bootLines[line]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-5 h-1 w-56 overflow-hidden rounded-full bg-secondary/60">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                backgroundImage:
                  'linear-gradient(90deg, oklch(0.72 0.16 258), oklch(0.68 0.2 292))',
              }}
            />
          </div>
          <span className="mt-2 font-mono text-[10px] tracking-widest text-muted-foreground">
            {Math.round(progress * 100)}%
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
