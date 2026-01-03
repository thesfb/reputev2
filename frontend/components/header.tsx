"use client"

import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">Repute.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm transition-colors ${pathname === "/" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            Product
          </Link>
          <Link 
            href="/developers" 
            className={`text-sm transition-colors ${pathname === "/developers" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            Developers
          </Link>
        </nav>

        <div className="flex items-center gap-4">
            <Link href="/launch">
                <Button 
                className="glow-hover relative bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                >
                Launch App
                </Button>
            </Link>
        </div>
      </div>
    </motion.header>
  )
}