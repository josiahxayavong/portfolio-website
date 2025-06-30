'use client'

import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageTransitionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn')

  // Detect route change and start fade out
  useEffect(() => {
    setTransitionStage('fadeOut')
  }, [pathname])

  // After fade out, update content and fade in
  const handleAnimationComplete = () => {
    if (transitionStage === 'fadeOut') {
      setDisplayChildren(children)
      setTransitionStage('fadeIn')
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionStage}
        initial={{ opacity: transitionStage === 'fadeIn' ? 0 : 1 }}
        animate={{ opacity: transitionStage === 'fadeIn' ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={handleAnimationComplete}
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
  )
}
