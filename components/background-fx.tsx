'use client'

import { useEffect, useRef } from 'react'

/**
 * Fixed, full-viewport ambient background: animated aurora blobs,
 * a subtle tech grid, and lightweight floating particles on canvas.
 */
export function BackgroundFx() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let raf = 0

    const count = Math.min(70, Math.floor(window.innerWidth / 22))
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? 258 : 292,
      a: Math.random() * 0.5 + 0.2,
    }))

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    if (!prefersReduced) {
      draw()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient wash */}
      <div className="aurora absolute inset-0 animate-[aurora-float_16s_ease-in-out_infinite]" />
      {/* Tech grid */}
      <div
        className="absolute inset-0 animate-[grid-fade_8s_ease-in-out_infinite] opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />
      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />
    </div>
  )
}
