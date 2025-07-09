/* this tells Next.js that this file must run on the client side.
it's required for using Framer Motion and hooks like 'usePathname'
to create the page transition animations. */
"use client"

// importing React types
import type React from "react"

// importing animation components from Framer Motion
import { motion, AnimatePresence } from "framer-motion"

// importing the 'usePathname' hook to detect URL changes
import { usePathname } from "next/navigation"

// this component wraps my page content to create fade transitions
export function PageTransition({ children }: { children: React.ReactNode }) {
  // get the current URL path. Framer Motion uses this as a 'key' to
  // detect when a page changes, which triggers the exit/enter animations.
  const pathname = usePathname()

  return (
    // AnimatePresence handles the animation of components when they are added or removed.
    // 'mode="wait"' ensures the exiting page finishes its animation before the new one starts.
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // the unique key that triggers the animation
        initial={{ opacity: 0 }} // start with the page invisible
        animate={{ opacity: 1 }} // fade in to full visibility
        exit={{ opacity: 0 }} // fade out to invisible
        transition={{
          duration: 0.34, // the speed of the animation
          ease: "easeInOut", // the animation timing function
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
