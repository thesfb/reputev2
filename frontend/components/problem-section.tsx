"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FishSymbol, Eye, Users } from "lucide-react"

const problems = [
  {
    icon: FishSymbol,
    title: "Security Risk",
    description:
      "Connecting your main wallet with significant holdings to new, unaudited dApps exposes you to phishing and exploit risks.",
    color: "text-destructive",
  },
  {
    icon: Eye,
    title: "Privacy Loss",
    description:
      "Proving your history means revealing your entire transaction history, doxxing your wealth and trading patterns to anyone.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Sybil Attacks",
    description:
      "Protocols struggle to differentiate genuine high-value users from bots and fake accounts gaming airdrops and whitelists.",
    color: "text-accent",
  },
]

export function ProblemSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Why Repute?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Current reputation systems force you to choose between privacy and proof. We solve this.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="p-8">
                <div
                  className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 ${problem.color}`}
                >
                  <problem.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
