"use client"

import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Repute.</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </button>
          <button
            onClick={() => scrollToSection("use-cases")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Use Cases
          </button>
        </nav>

        <Button
          onClick={() => scrollToSection("app")}
          className="glow-hover relative bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
        >
          Launch App
        </Button>
      </div>
    </motion.header>
  )
}
