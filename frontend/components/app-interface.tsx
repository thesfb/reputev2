"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, Check, Sparkles } from "lucide-react"
import { ProofGenerationAnimation } from "@/components/proof-generation-animation"

type Step = "connect" | "generate" | "mint" | "success"

export function AppInterface() {
  const [currentStep, setCurrentStep] = useState<Step>("connect")
  const [isConnected, setIsConnected] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [destinationAddress, setDestinationAddress] = useState("")

  const handleConnect = () => {
    setIsConnected(true)
    setTimeout(() => setCurrentStep("generate"), 1000)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setCurrentStep("generate")
    setTimeout(() => {
      setIsGenerating(false)
      setCurrentStep("mint")
    }, 4000)
  }

  const handleMint = () => {
    setCurrentStep("success")
  }

  return (
    <section id="app" className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Launch the App</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Generate your ZK proof and mint your reputation badge in minutes
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold">Reputation Wizard</CardTitle>
            <CardDescription className="text-base">Follow the steps to mint your reputation badge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pb-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-3">
              {["connect", "generate", "mint"].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep === step ||
                      (index === 0 && isConnected) ||
                      (index === 1 && currentStep === "mint") ||
                      currentStep === "success"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {(index === 0 && isConnected) ||
                    (index === 1 && currentStep === "mint") ||
                    currentStep === "success" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-16 h-0.5 transition-all ${
                        (
                          index === 0 &&
                            (currentStep === "generate" || currentStep === "mint" || currentStep === "success")
                        ) || (index === 1 && (currentStep === "mint" || currentStep === "success"))
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Connect Wallet */}
              {currentStep === "connect" && (
                <motion.div
                  key="connect"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                      <Wallet className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Connect Main Wallet</h3>
                    <p className="text-muted-foreground">Connect your Solana wallet with Jupiter history</p>
                  </div>
                  <Button
                    onClick={handleConnect}
                    size="lg"
                    className="w-full glow-hover bg-primary hover:bg-primary/90 text-lg py-6"
                  >
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Phantom Wallet
                  </Button>
                  {isConnected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-success"
                    >
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Checking Jupiter History... Found! ✓</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Generate Proof */}
              {currentStep === "generate" && (
                <motion.div
                  key="generate"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold">Generate ZK Proof</h3>
                    <p className="text-muted-foreground">Create a cryptographic proof of your reputation</p>
                  </div>
                  {!isGenerating ? (
                    <Button
                      onClick={handleGenerate}
                      size="lg"
                      className="w-full glow-hover bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate ZK Proof
                    </Button>
                  ) : (
                    <ProofGenerationAnimation />
                  )}
                </motion.div>
              )}

              {/* Step 3: Mint to Destination */}
              {currentStep === "mint" && (
                <motion.div
                  key="mint"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
                      <Check className="w-10 h-10 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold">Proof Generated!</h3>
                    <p className="text-muted-foreground">Enter your destination wallet address to mint the badge</p>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Destination Wallet Address (e.g., 7xK...M4zP)"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      className="h-12 text-base bg-secondary border-border"
                    />
                    <Button
                      onClick={handleMint}
                      disabled={!destinationAddress}
                      size="lg"
                      className="w-full glow-hover bg-success hover:bg-success/90 text-success-foreground text-lg py-6"
                    >
                      Mint Badge to Destination
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Success State */}
              {currentStep === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mx-auto"
                  >
                    <Check className="w-12 h-12 text-success" />
                  </motion.div>
                  <h3 className="text-3xl font-bold">Badge Minted Successfully!</h3>
                  <p className="text-muted-foreground text-lg">
                    Your reputation badge has been minted to {destinationAddress.slice(0, 6)}...
                    {destinationAddress.slice(-4)}
                  </p>
                  <Button
                    onClick={() => {
                      setCurrentStep("connect")
                      setIsConnected(false)
                      setDestinationAddress("")
                    }}
                    variant="outline"
                    size="lg"
                    className="mx-auto"
                  >
                    Start New Proof
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
