'use client'

import { useEffect, useRef } from 'react'

type Trace = {
  points: { x: number; y: number }[]
  length: number
  hue: number
}

type Pulse = {
  trace: number
  pos: number
  speed: number
  hue: number
  len: number
}

type Pad = {
  x: number
  y: number
  r: number
  hue: number
  phase: number
  ring: boolean
}

type Chip = {
  x: number
  y: number
  w: number
  h: number
  pins: number
  hue: number
}

/**
 * Fixed, full-viewport "running electronics board" background.
 * Renders a PCB-style network of Manhattan-routed copper traces, IC chip
 * footprints, ringed vias/solder pads, and bright signal pulses that travel
 * along the traces — evoking a live, working circuit board. Falls back to a
 * static board when the user prefers reduced motion.
 */
export function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const el = canvas
    const c = ctx
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0

    let traces: Trace[] = []
    let pulses: Pulse[] = []
    let pads: Pad[] = []
    let chips: Chip[] = []

    // Blue (258) and violet (292) to match the site palette.
    const hueFor = () => (Math.random() > 0.5 ? 258 : 292)

    function traceLength(points: { x: number; y: number }[]) {
      let len = 0
      for (let i = 1; i < points.length; i++) {
        len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
      }
      return len
    }

    function pointAt(trace: Trace, dist: number) {
      let d = dist
      for (let i = 1; i < trace.points.length; i++) {
        const a = trace.points[i - 1]
        const b = trace.points[i]
        const seg = Math.hypot(b.x - a.x, b.y - a.y)
        if (d <= seg) {
          const t = seg === 0 ? 0 : d / seg
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
        }
        d -= seg
      }
      const last = trace.points[trace.points.length - 1]
      return { x: last.x, y: last.y }
    }

    function build() {
      const grid = 40 // spacing of the routing grid
      const cols = Math.ceil(width / grid)
      const rows = Math.ceil(height / grid)
      traces = []
      pads = []
      chips = []

      // Denser trace network that scales with the viewport.
      const traceCount = Math.min(90, Math.floor((cols * rows) / 14) + 18)

      for (let t = 0; t < traceCount; t++) {
        const points: { x: number; y: number }[] = []
        let cx = Math.floor(Math.random() * cols)
        let cy = Math.floor(Math.random() * rows)
        points.push({ x: cx * grid, y: cy * grid })
        const segments = 3 + Math.floor(Math.random() * 5)
        let horizontal = Math.random() > 0.5
        for (let s = 0; s < segments; s++) {
          const step = (1 + Math.floor(Math.random() * 5)) * (Math.random() > 0.5 ? 1 : -1)
          if (horizontal) {
            cx = Math.max(0, Math.min(cols, cx + step))
          } else {
            cy = Math.max(0, Math.min(rows, cy + step))
          }
          points.push({ x: cx * grid, y: cy * grid })
          horizontal = !horizontal
        }
        const hue = hueFor()
        traces.push({ points, length: traceLength(points), hue })

        // Ringed vias/solder pads at both ends of the trace.
        const start = points[0]
        const end = points[points.length - 1]
        pads.push({ x: start.x, y: start.y, r: 3, hue, phase: Math.random() * Math.PI * 2, ring: true })
        pads.push({ x: end.x, y: end.y, r: 3, hue, phase: Math.random() * Math.PI * 2, ring: Math.random() > 0.4 })
      }

      // Scatter a few IC chip footprints on the board.
      const chipCount = Math.max(2, Math.floor((cols * rows) / 220))
      for (let i = 0; i < chipCount; i++) {
        const pins = 4 + Math.floor(Math.random() * 5)
        const w = pins * 12
        const h = 34 + Math.floor(Math.random() * 22)
        chips.push({
          x: Math.random() * Math.max(1, width - w),
          y: Math.random() * Math.max(1, height - h),
          w,
          h,
          pins,
          hue: hueFor(),
        })
      }

      // Seed pulses travelling along a subset of traces.
      pulses = []
      const pulseCount = Math.min(traces.length, 48)
      for (let i = 0; i < pulseCount; i++) {
        const trace = Math.floor(Math.random() * traces.length)
        pulses.push({
          trace,
          pos: Math.random() * traces[trace].length,
          speed: 0.7 + Math.random() * 1.6,
          hue: traces[trace].hue,
          len: 44 + Math.random() * 70,
        })
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      el.width = Math.floor(width * dpr)
      el.height = Math.floor(height * dpr)
      el.style.width = `${width}px`
      el.style.height = `${height}px`
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function drawChip(chip: Chip) {
      const { x, y, w, h, pins, hue } = chip
      // Body
      c.beginPath()
      c.rect(x, y, w, h)
      c.fillStyle = `hsla(${hue}, 40%, 30%, 0.16)`
      c.fill()
      c.strokeStyle = `hsla(${hue}, 70%, 62%, 0.5)`
      c.lineWidth = 1.2
      c.stroke()
      // Notch dot
      c.beginPath()
      c.arc(x + 7, y + 7, 2, 0, Math.PI * 2)
      c.fillStyle = `hsla(${hue}, 90%, 72%, 0.7)`
      c.fill()
      // Pins along top and bottom
      const gap = w / (pins + 1)
      c.strokeStyle = `hsla(${hue}, 75%, 64%, 0.55)`
      c.lineWidth = 2
      for (let i = 1; i <= pins; i++) {
        const px = x + gap * i
        c.beginPath()
        c.moveTo(px, y)
        c.lineTo(px, y - 7)
        c.moveTo(px, y + h)
        c.lineTo(px, y + h + 7)
        c.stroke()
      }
    }

    function drawBoard() {
      c.clearRect(0, 0, width, height)

      // Copper traces (base layer, clearly visible).
      c.lineCap = 'round'
      c.lineJoin = 'round'
      for (const trace of traces) {
        c.beginPath()
        c.moveTo(trace.points[0].x, trace.points[0].y)
        for (let i = 1; i < trace.points.length; i++) {
          c.lineTo(trace.points[i].x, trace.points[i].y)
        }
        c.strokeStyle = `hsla(${trace.hue}, 72%, 60%, 0.32)`
        c.lineWidth = 1.6
        c.stroke()
      }

      // IC chips.
      for (const chip of chips) drawChip(chip)

      // Solder pads / vias with a soft breathing glow.
      const now = performance.now() / 1000
      for (const p of pads) {
        const glow = 0.4 + 0.4 * Math.sin(now * 1.8 + p.phase)
        // Halo
        c.beginPath()
        c.arc(p.x, p.y, p.r + 2.5, 0, Math.PI * 2)
        c.fillStyle = `hsla(${p.hue}, 88%, 66%, 0.12)`
        c.fill()
        if (p.ring) {
          // Donut via
          c.beginPath()
          c.arc(p.x, p.y, p.r + 0.5, 0, Math.PI * 2)
          c.strokeStyle = `hsla(${p.hue}, 90%, 70%, ${0.45 + glow * 0.4})`
          c.lineWidth = 1.4
          c.stroke()
          c.beginPath()
          c.arc(p.x, p.y, p.r - 1.6, 0, Math.PI * 2)
          c.fillStyle = `hsla(${p.hue}, 90%, 74%, ${0.35 + glow * 0.4})`
          c.fill()
        } else {
          c.beginPath()
          c.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          c.fillStyle = `hsla(${p.hue}, 90%, 72%, ${0.4 + glow * 0.4})`
          c.fill()
        }
      }
    }

    function drawPulses(delta: number) {
      for (const p of pulses) {
        const trace = traces[p.trace]
        if (!trace) continue
        p.pos += p.speed * delta * 0.07
        if (p.pos > trace.length + p.len) {
          // Respawn on a (possibly new) trace.
          p.trace = Math.floor(Math.random() * traces.length)
          p.pos = -p.len
          p.hue = traces[p.trace]?.hue ?? hueFor()
          p.speed = 0.7 + Math.random() * 1.6
        }

        const head = pointAt(trace, Math.max(0, Math.min(trace.length, p.pos)))
        const tail = pointAt(trace, Math.max(0, Math.min(trace.length, p.pos - p.len)))

        const grad = c.createLinearGradient(tail.x, tail.y, head.x, head.y)
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 70%, 0)`)
        grad.addColorStop(1, `hsla(${p.hue}, 96%, 74%, 0.95)`)

        c.beginPath()
        c.moveTo(tail.x, tail.y)
        c.lineTo(head.x, head.y)
        c.strokeStyle = grad
        c.lineWidth = 2.6
        c.stroke()

        // Bright signal head.
        c.beginPath()
        c.arc(head.x, head.y, 2.6, 0, Math.PI * 2)
        c.fillStyle = `hsla(${p.hue}, 100%, 84%, 0.98)`
        c.shadowColor = `hsla(${p.hue}, 100%, 70%, 1)`
        c.shadowBlur = 16
        c.fill()
        c.shadowBlur = 0
      }
    }

    let last = performance.now()
    function frame(t: number) {
      const delta = Math.min(48, t - last)
      last = t
      drawBoard()
      drawPulses(delta)
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReduced) {
      drawBoard()
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient wash */}
      <div className="aurora absolute inset-0 opacity-70 animate-[aurora-float_16s_ease-in-out_infinite]" />
      {/* Running electronics board */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: 'radial-gradient(ellipse 120% 120% at 50% 40%, black 70%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 120% 120% at 50% 40%, black 70%, transparent 100%)',
        }}
      />
      {/* Soft vignette for depth (kept light so the board stays visible) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,color-mix(in_oklch,var(--background)_85%,transparent)_100%)]" />
    </div>
  )
}
