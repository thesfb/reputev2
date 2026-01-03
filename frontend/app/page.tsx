import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { AppInterface } from "@/components/app-interface"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen mesh-gradient">
      <Header />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <AppInterface />
      <Footer />
    </main>
  )
}
