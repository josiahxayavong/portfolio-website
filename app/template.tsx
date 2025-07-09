"use client"

import type React from "react"

import { motion } from "framer-motion"

// This template component will wrap every page and provide the entry animation.
// Because it's a template, Next.js re-mounts it on every navigation,
// ensuring the animation runs consistently.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
