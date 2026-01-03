"use client"

import { motion } from "framer-motion"
import { Wallet, Sparkles, ShieldCheck } from "lucide-react"

export function ZKAnimation() {
  return (
    <div className="relative h-[400px] flex items-center justify-center">
      {/* Whale Wallet (Source) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute left-0 top-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/50">
            <Wallet className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-success flex items-center justify-center">
            <span className="text-xs font-bold text-success-foreground">W</span>
          </div>
        </div>
        <p className="text-sm text-center mt-3 text-muted-foreground font-medium">Main Vault</p>
      </motion.div>

      {/* ZK Spark Animation */}
      <motion.div
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          delay: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
          times: [0, 0.2, 0.8, 1],
        }}
        className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <Sparkles className="w-8 h-8 text-accent" />
      </motion.div>

      {/* Connection Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute left-[20%] right-[20%] top-1/2 h-0.5 bg-gradient-to-r from-primary via-accent to-success origin-left"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </motion.div>

      {/* Burner Wallet (Destination) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 oklch(0.72 0.21 168 / 0)",
              "0 0 20px 10px oklch(0.72 0.21 168 / 0.3)",
              "0 0 0 0 oklch(0.72 0.21 168 / 0)",
            ],
          }}
          transition={{
            duration: 2,
            delay: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center shadow-lg border border-border">
            <Wallet className="w-10 h-10 text-muted-foreground" />
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.5 }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-lg shadow-success/50"
          >
            <ShieldCheck className="w-5 h-5 text-success-foreground" />
          </motion.div>
        </motion.div>
        <p className="text-sm text-center mt-3 text-muted-foreground font-medium">Badged Wallet</p>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-success/5 rounded-3xl blur-3xl -z-10" />
    </div>
  )
}
