'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Preloader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
            <span className="font-mono text-lg font-bold text-gradient">AG</span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            Initializing
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
