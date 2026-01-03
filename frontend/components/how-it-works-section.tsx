"use client"

import { motion } from "framer-motion"
import { Wallet, CircuitBoard, ArrowRight, Sparkles } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Connect Source",
    description:
      "Connect your main wallet to generate a local ZK proof of history. Your keys never leave your browser.",
    icon: Wallet,
    color: "primary",
  },
  {
    number: "02",
    title: "The ZK Magic",
    description: "A Zero-Knowledge proof is generated. It proves what you did, without revealing who you are.",
    icon: CircuitBoard,
    color: "accent",
  },
  {
    number: "03",
    title: "Mint to Destination",
    description:
      "Disconnect Wallet A. Provide a fresh destination address. The relay mints your reputation badge gaslessly.",
    icon: Sparkles,
    color: "success",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Three simple steps to port your reputation while maintaining complete privacy
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-12">
              {/* Step Number & Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${step.color} to-${step.color}/50 flex items-center justify-center shadow-lg shadow-${step.color}/30`}
                  >
                    <step.icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">{step.number}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="hidden md:block absolute left-10 top-24 h-20"
                >
                  <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
