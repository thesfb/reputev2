import { Navbar } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Code2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Custom Hero Wrapper to route to new pages */}
      <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container px-4 mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Prove History.<br />Protect Identity.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                The Zero-Knowledge Reputation Layer for Solana. Prove you are a Power User without connecting your main wallet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <Link href="/launch">
                    <Button size="lg" className="h-14 px-8 text-lg glow-hover w-full sm:w-auto">
                        Launch App <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
                <Link href="/developers">
                    <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                        <Code2 className="ml-2 w-5 h-5 mr-2" /> Developer SDK
                    </Button>
                </Link>
            </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50" />
      </div>

      <ProblemSection />
      <HowItWorksSection />
      
      <Footer />
    </main>
  )
}