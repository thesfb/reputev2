import { Navbar } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Terminal, Code2, BookOpen, Shield, Zap, AlertCircle, Database } from "lucide-react";
import Link from "next/link";

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Dev Hub Header */}
      <section className="pt-32 pb-16 text-center space-y-6 container mx-auto px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid-white/[0.02] -z-10" />
        <Badge variant="outline" className="border-primary/50 text-primary animate-in fade-in zoom-in">v1.0.0 Public Beta</Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Repute Developer Hub
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          The complete toolkit for integrating Zero-Knowledge reputation into your Solana dApps.
          Verify users without doxxing them.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button size="lg" className="h-12 px-8 glow-hover">Get API Keys</Button>
          <Button variant="outline" size="lg" className="h-12 px-8">
            <BookOpen className="w-4 h-4 mr-2" /> Read the Whitepaper
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        <Tabs defaultValue="quickstart" className="space-y-12">
          
          {/* Navigation Tabs */}
          <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-4 border-b border-border/40">
            <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-transparent gap-2">
              <TabsTrigger value="quickstart" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6 py-2">Quick Start</TabsTrigger>
              <TabsTrigger value="react-sdk" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6 py-2">React SDK</TabsTrigger>
              <TabsTrigger value="api-reference" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6 py-2">REST API</TabsTrigger>
              <TabsTrigger value="concepts" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6 py-2">Core Concepts</TabsTrigger>
              <TabsTrigger value="pricing" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-6 py-2">Pricing</TabsTrigger>
            </TabsList>
          </div>

          {/* ==================== QUICK START TAB ==================== */}
          <TabsContent value="quickstart" className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid md:grid-cols-[2fr_1fr] gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Installation</h2>
                  <p className="text-muted-foreground mb-6">
                    Add the Repute SDK to your project. It works with Next.js, Vite, Remix, and Create React App.
                  </p>
                  <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-sm flex items-center justify-between group">
                    <span className="text-green-400">npm install <span className="text-white">@repute-protocol/react</span></span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"><Copy className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-4">Basic Usage</h2>
                  <p className="text-muted-foreground mb-6">
                    Wrap your sensitive content with the <code>ReputeGate</code> component. The SDK handles wallet connection checks, badge verification, and fallback UI automatically.
                  </p>
                  <Card className="bg-zinc-950 border-zinc-800 text-zinc-300 overflow-hidden">
                    <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                      <span className="text-xs ml-2 text-zinc-500">app/voting/page.tsx</span>
                    </div>
                    <CardContent className="p-6 font-mono text-sm overflow-x-auto">
<pre>{`import { ReputeGate } from '@repute-protocol/react';

export default function ProtectedVotingPage() {
  return (
    <main>
      <h1>DAO Governance</h1>
      
      {/* Only Power Users can see this section */}
      <ReputeGate 
        criteria="power-user"
        fallback={<p>You must be a Power User to vote.</p>}
      >
        <VotingBooth proposalId="123" />
        <SecretChat />
      </ReputeGate>
      
    </main>
  );
}`}</pre>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="bg-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> Why use the SDK?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>✅ <strong>Auto-Wallet Detection:</strong> Automatically works with Phantom, Solflare, and Backpack.</p>
                    <p>✅ <strong>Cache Management:</strong> Verifications are cached locally to prevent redundant API calls.</p>
                    <p>✅ <strong>Type Safety:</strong> Full TypeScript support out of the box.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500" /> Supported Chains</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Solana Mainnet</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Solana Devnet</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Eclipse (Coming Soon)</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ==================== REACT SDK TAB ==================== */}
          <TabsContent value="react-sdk" className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Component API</h2>
                <p className="text-muted-foreground">Full reference for the <code>&lt;ReputeGate /&gt;</code> component.</p>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-foreground font-medium">
                      <tr>
                        <th className="p-4 border-b">Prop</th>
                        <th className="p-4 border-b">Type</th>
                        <th className="p-4 border-b">Default</th>
                        <th className="p-4 border-b">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-4 font-mono text-primary">criteria</td>
                        <td className="p-4 font-mono text-xs">string</td>
                        <td className="p-4 font-mono text-xs">"power-user"</td>
                        <td className="p-4 text-muted-foreground">The specific reputation badge ID required to unlock content.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-primary">fallback</td>
                        <td className="p-4 font-mono text-xs">ReactNode</td>
                        <td className="p-4 font-mono text-xs">undefined</td>
                        <td className="p-4 text-muted-foreground">Component to render if verification fails. If null, renders default Locked UI.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-primary">loadingComponent</td>
                        <td className="p-4 font-mono text-xs">ReactNode</td>
                        <td className="p-4 font-mono text-xs">Spinner</td>
                        <td className="p-4 text-muted-foreground">Custom UI to show while checking the blockchain.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-primary">onVerify</td>
                        <td className="p-4 font-mono text-xs">() ={'>'} void</td>
                        <td className="p-4 font-mono text-xs">-</td>
                        <td className="p-4 text-muted-foreground">Callback function fired when verification succeeds.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Hooks (Advanced)</h2>
                <p className="text-muted-foreground">For building completely custom UIs, use the <code>useRepute</code> hook.</p>
                <Card className="bg-zinc-950 border-zinc-800 text-zinc-300">
                  <CardContent className="p-6 font-mono text-sm">
<pre>{`import { useRepute } from '@repute-protocol/react';

export function CustomStatusBadge() {
  const { isVerified, isLoading, checkReputation } = useRepute("power-user");

  if (isLoading) return <span>Checking...</span>;

  return isVerified ? (
    <span className="text-green-500">Verified Human ✅</span>
  ) : (
    <button onClick={checkReputation} className="text-red-500">
      Verify Now ⚠️
    </button>
  );
}`}</pre>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ==================== API REFERENCE TAB ==================== */}
          <TabsContent value="api-reference" className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">POST</Badge>
                  <code className="text-xl font-mono">/api/v1/verify</code>
                </div>
                <p className="text-muted-foreground">
                  The core endpoint for server-side verification. Use this if you are building a backend service (Node, Python, Go) that needs to gate resources.
                </p>
                
                <h3 className="text-lg font-bold mt-8">Request Body</h3>
                <Card className="bg-secondary/30">
                  <CardContent className="p-4 font-mono text-sm">
{`{
  "address": "7xK...3aP",  // The user's wallet address
  "criteria": "power-user" // (Optional) Specific badge to check
}`}
                  </CardContent>
                </Card>

                <h3 className="text-lg font-bold mt-8">Response (200 OK)</h3>
                <Card className="bg-secondary/30">
                  <CardContent className="p-4 font-mono text-sm text-green-600">
{`{
  "verified": true,
  "badge": {
    "name": "Repute: Power User",
    "mint": "Bx9...zW2",
    "timestamp": 170982342
  }
}`}
                  </CardContent>
                </Card>

                <h3 className="text-lg font-bold mt-8">Response (401 Unauthorized)</h3>
                <Card className="bg-secondary/30">
                  <CardContent className="p-4 font-mono text-sm text-red-500">
{`{
  "verified": false,
  "error": "No valid badge found for criteria: power-user"
}`}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Include your API key in the header of every request.
                  </p>
                  <div className="bg-zinc-950 p-3 rounded border border-zinc-800 font-mono text-xs text-zinc-400">
                    Authorization: Bearer <span className="text-yellow-500">rp_live_8x92m...</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Rate Limits</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex justify-between border-b pb-2"><span>Free Tier</span> <span>100 req/min</span></li>
                    <li className="flex justify-between border-b pb-2"><span>Pro Tier</span> <span>1,000 req/min</span></li>
                    <li className="flex justify-between border-b pb-2"><span>Enterprise</span> <span>Unlimited</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ==================== CONCEPTS TAB ==================== */}
          <TabsContent value="concepts" className="space-y-12">
             <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Shield className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>Zero-Knowledge Proofs</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Repute uses <strong>Groth16</strong> proofs (via Circom & SnarkJS). This allows a user to prove a statement ("I own a wallet with 100 txs") without revealing <em>which</em> wallet it is. The proof is verified mathematically by our Relayer.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>Nullifiers</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    To prevent double-spending (e.g., minting 10 badges from 1 whale wallet), we generate a unique hash called a <strong>Nullifier</strong>. If a user tries to generate a proof again, the Nullifier will match an existing record, and the mint will be rejected.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Zap className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>Soulbound Assets</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Badges are minted as <strong>Metaplex Core</strong> assets. We enforce a "Soulbound" rule, meaning these NFTs cannot be transferred, sold, or burned by the user. They are permanent marks of reputation.
                  </CardContent>
                </Card>
             </div>
          </TabsContent>

          {/* ==================== PRICING TAB ==================== */}
          <TabsContent value="pricing">
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              {/* Free Tier */}
              <Card className="relative border-border flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">Hobby</CardTitle>
                  <CardDescription>For hackathons and side projects.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="text-4xl font-bold">$0<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> 100 Verifications/mo</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Standard Badge Criteria</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Community Support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Start Free</Button>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="relative border-primary shadow-2xl shadow-primary/10 scale-105 z-10 flex flex-col bg-card">
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full tracking-wide">MOST POPULAR</span>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Pro</CardTitle>
                  <CardDescription>For scaling dApps and DAOs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="text-4xl font-bold">$49<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> 10,000 Verifications/mo</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Custom Badge Criteria</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Priority Relayer (Faster Mints)</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Analytics Dashboard</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> 99.9% Uptime SLA</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full glow-hover">Get Pro</Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card className="relative border-border flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>For protocols and high volume.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="text-4xl font-bold">Custom</div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Unlimited Verifications</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> Custom ZK Circuits</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> White-glove Onboarding</li>
                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500" /> 24/7 Dedicated Support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-12 p-6 bg-secondary/20 rounded-xl flex items-start gap-4">
               <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
               <div className="space-y-2">
                 <h4 className="font-bold">Need a custom integration?</h4>
                 <p className="text-sm text-muted-foreground">
                   We offer custom ZK circuit design for enterprise partners. If you need to verify specific on-chain behaviors (e.g. "Held NFT X for &gt; 30 days"), contact our engineering team.
                 </p>
                 <Link href="#" className="text-primary text-sm font-medium hover:underline">Schedule a call -{'>'}</Link>
               </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  );
}