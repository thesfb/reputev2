import { AppInterface } from "@/components/app-interface";
import { Navbar } from "@/components/header";
import { Footer } from "@/components/footer";

export default function LaunchPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center pt-10">
        <AppInterface />
      </div>
      <Footer />
    </main>
  );
}