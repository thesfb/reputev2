import { ReputeGate } from "@/components/repute-gate";
import { Navbar } from "@/components/header"; // Ensure this matches your actual import

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Simulate a 3rd Party App Header */}
      <div className="border-b bg-secondary/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
            <h1 className="font-mono text-xl font-bold text-blue-600">SuperDAO Voting</h1>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Powered by Repute</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">Proposal #42: Launch Token</h2>
                <p className="text-muted-foreground">Only verified Power Users can view the voting details.</p>
            </div>

            {/* THIS IS THE MAGIC: The Content is Gated */}
            <ReputeGate criteria="power-user">
                
                {/* Protected Content */}
                <div className="bg-card border rounded-xl p-8 shadow-lg space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="flex items-center justify-between border-b pb-4">
                        <h3 className="text-2xl font-bold text-green-600">✅ Access Granted</h3>
                        <span className="text-sm text-muted-foreground">Your anonymous reputation verified.</span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="bg-secondary/50 p-6 rounded-lg text-center space-y-2">
                            <h4 className="font-bold text-xl">Yes, Launch It 🚀</h4>
                            <p className="text-sm text-muted-foreground">95% Support</p>
                            <button className="w-full bg-primary text-primary-foreground py-2 rounded font-bold mt-2">Vote YES</button>
                        </div>
                        <div className="bg-secondary/50 p-6 rounded-lg text-center space-y-2">
                            <h4 className="font-bold text-xl">No, Wait 🛑</h4>
                            <p className="text-sm text-muted-foreground">5% Support</p>
                            <button className="w-full bg-destructive text-destructive-foreground py-2 rounded font-bold mt-2">Vote NO</button>
                        </div>
                    </div>
                </div>

            </ReputeGate>
        </div>
      </div>
    </main>
  );
}