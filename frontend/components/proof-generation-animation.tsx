"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ProofGenerationAnimation() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6 py-8">
      {/* Circuit Animation */}
      <div className="relative h-32 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Circuit paths */}
          <motion.path
            d="M 50 60 L 150 60"
            stroke="url(#gradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.path
            d="M 150 60 L 200 30 L 250 30"
            stroke="url(#gradient2)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.path
            d="M 150 60 L 200 90 L 250 90"
            stroke="url(#gradient3)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.path
            d="M 250 30 L 300 60 L 350 60"
            stroke="url(#gradient4)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.path
            d="M 250 90 L 300 60"
            stroke="url(#gradient5)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Nodes */}
          {[50, 150, 200, 250, 300, 350].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={i === 2 || i === 3 ? (i === 2 ? 30 : 90) : 60}
              r="4"
              fill="oklch(0.68 0.24 285)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ duration: 0.5, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            />
          ))}

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.68 0.24 285)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.68 0.24 285)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.72 0.21 168)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.72 0.21 168)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.72 0.21 168)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.72 0.21 168)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.65 0.18 156)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 156)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.65 0.18 156)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 156)" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-medium">Generating ZK Proof...</span>
          <span className="text-primary font-bold">{progress}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-success"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Status Messages */}
      <div className="space-y-2 text-sm">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: progress > 10 ? 1 : 0, x: 0 }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>Analyzing wallet transactions...</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: progress > 40 ? 1 : 0, x: 0 }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Compiling cryptographic circuit...</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: progress > 70 ? 1 : 0, x: 0 }}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          <span>Generating zero-knowledge proof...</span>
        </motion.div>
      </div>
    </div>
  )
}
