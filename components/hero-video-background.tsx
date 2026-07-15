'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Full-bleed cinematic hero background video.
 * - Autoplays muted + loops, plays inline on mobile
 * - Fades in smoothly once the first frame is ready
 * - Falls back to a poster image if the video fails to load
 * - Respects prefers-reduced-motion by pausing autoplay
 */
export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      // Show first frame but do not autoplay motion.
      video.pause()
      setLoaded(true)
      return
    }

    const play = video.play()
    if (play && typeof play.catch === 'function') {
      play.catch(() => {
        /* Autoplay may be blocked; poster fallback remains visible. */
      })
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      {/* Poster / graceful fallback */}
      <Image
        src="/hero-illustration.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-opacity duration-700 ${
          loaded && !failed ? 'opacity-0' : 'opacity-60'
        }`}
      />

      {!failed && (
        <motion.video
          ref={videoRef}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.06 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-illustration.png"
          onCanPlay={() => setLoaded(true)}
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
        >
          <source src="/assets/videos/PixVerse_V6_Image_Text_540P_create_a_motion_vi.mp4" type="video/mp4" />
        </motion.video>
      )}

      {/* Dark readability overlay (~65%) */}
      <div className="absolute inset-0 bg-background/65" />
      {/* Subtle blur + premium gradient tint */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_30%,transparent_0%,color-mix(in_oklch,var(--background)_60%,transparent)_78%)]" />
    </div>
  )
}
