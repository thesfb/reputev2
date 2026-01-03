"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ZKAnimation } from "@/components/zk-animation"

export function HeroSection() {
  const scrollToApp = () => {
    const element = document.getElementById("app")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight mb-6">
            Port Your Solana Reputation. <span className="text-primary">Private.</span>{" "}
            <span className="text-accent">Secure.</span> <span className="text-success">Sybil-Resistant.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
            Prove your on-chain history using Zero-Knowledge proofs and mint reputation badges to fresh wallets. Keep
            your main vault safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={scrollToApp}
              size="lg"
              className="glow-hover relative bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 shadow-lg shadow-primary/25"
            >
              Start Proving Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-border hover:bg-secondary bg-transparent"
            >
              Read Documentation
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <ZKAnimation />
        </motion.div>
      </div>
    </section>
  )
}
