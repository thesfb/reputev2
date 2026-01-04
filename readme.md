Repute Protocol

Decentralized Identity Verification for Web3 — Prove Your Credentials Without Revealing Your Identity

Live Demo: https://repute.vercel.app | Network: Solana Devnet

The Problem: Web3's Identity Crisis
Web3 faces a fundamental Trust Paradox:
For Users: The Privacy Trap

Whales refuse to connect main wallets to new dApps due to security risks (wallet drainers) and privacy concerns (doxxing their net worth)
Result: They miss opportunities because they can't prove their status safely

For Developers: The Sybil Attack

dApps and DAOs struggle to verify if users are real humans or bot farms
Without reliable verification, marketing budgets are drained by fake accounts and voting systems are manipulated


The Solution: Trustless Unlinkability
Repute decouples Verification from Identification using Zero-Knowledge Proofs (ZK-SNARKs).
Core Innovation
Users can "port" their reputation from a high-value wallet to a secure, anonymous burner wallet:
Prove WHAT you are → Without revealing WHO you are
Example Use Cases:

"I am a Power User" (wallet history > 1 year)
"I hold a MadLads NFT" (without revealing which one)
"I have 1000+ transactions" (without showing addresses)
"I'm a real human" (not a Sybil bot)


Architecture
USER FLOW
---------

1. CONNECT           2. PROVE              3. MINT              4. ACCESS
   Main Wallet   →   ZK-Proof Gen      →   Badge Minted    →   Use Burner
   (Private)         (Client-side)         (Relayer)           (Anonymous)
                                                                      
   Phantom       →   snarkjs          →   Relayer          →   dApp
   Wallet            (Browser)            (Server)             (Gated)
                        ↓                      ↓                   ↓
                  verification_key      Metaplex NFT        ReputeGate
                     (circom)            (Soulbound)           (SDK)
Tech Stack
Frontend: Next.js 16 + TypeScript
ZK Circuits: Circom + snarkjs (client-side proof generation)
Blockchain: Solana Devnet
NFT Standard: Metaplex (Soulbound badges)
Relayer: Node.js + Express
SDK: React Components for developers

Getting Started
Prerequisites

Node.js 18+ and npm/pnpm
Solana CLI installed
Phantom Wallet (in Devnet mode)

Installation
bash# Clone the repository
git clone https://github.com/thesfb/reputev2.git
cd reputev2

# Install dependencies
cd frontend
npm install

cd ../relayer
npm install

cd ../circuits
npm install
Local Development
Start the Relayer:
bashcd relayer
export KEYPAIR_PATH=/path/to/your/devnet-keypair.json
npm start
# Relayer running on http://localhost:3001
Start the Frontend:
bashcd frontend
npm run dev
# Frontend running on http://localhost:3000
Get Devnet SOL:
bashsolana airdrop 2 <YOUR_RELAYER_PUBLIC_KEY> --url devnet
# Or use: https://faucet.solana.com

How It Works: The "Clean Room" Protocol
Step 1: Connection (Client-Side Only)
User connects main wallet - NEVER leaves browser
typescriptconst mainWallet = await window.solana.connect();
Step 2: Proof Generation (Zero-Knowledge)
Browser generates ZK-proof without revealing address
typescriptconst proof = await generateProof({
  publicKey: mainWallet.publicKey,
  transactionHistory: await fetchHistory(mainWallet),
  credential: "POWER_USER" // Checking: history > 1 year
});
// Output: { proof, publicSignals } - Address is HIDDEN
Step 3: Badge Minting (Relayer)
Relayer verifies proof and mints badge to burner wallet
typescriptPOST /api/mint-badge
{
  "burnerWallet": "NEW_ANONYMOUS_ADDRESS",
  "proof": "...",
  "credentialType": "POWER_USER"
}
// Returns: Soulbound NFT Badge Address
Step 4: Access Gated Features
Developer integrates with SDK
typescriptimport { ReputeGate } from '@repute-protocol/react';

<ReputeGate credential="POWER_USER">
  <PremiumFeature />
</ReputeGate>
// Only users with valid badge can access
Key Security Feature: Main wallet is disconnected after Step 2. There is ZERO on-chain link between the main wallet and burner wallet.

For Developers: SDK Integration
Install the SDK
bashnpm install @repute-protocol/react
Wrap Components with ReputeGate
tsximport { ReputeGate, ReputeProvider } from '@repute-protocol/react';

function App() {
  return (
    <ReputeProvider network="devnet">
      <ReputeGate 
        credential="POWER_USER"
        fallback={<PleaseVerify />}
      >
        <ProtectedContent />
      </ReputeGate>
    </ReputeProvider>
  );
}
Check Badge Programmatically
tsximport { useRepute } from '@repute-protocol/react';

function Dashboard() {
  const { hasBadge, badges, loading } = useRepute();
  
  if (loading) return <Spinner />;
  
  return (
    <div>
      {hasBadge('POWER_USER') ? (
        <VIPDashboard badges={badges} />
      ) : (
        <GetVerified />
      )}
    </div>
  );
}

Business Model: Verification-as-a-Service
Repute operates on a B2B SaaS model (we charge developers, not users):
Hobby Tier: Free - 100 verifications/mo - Basic badge types, community support
Pro Tier: $49/mo - 10,000 verifications/mo - Custom badges, analytics, faster relayer
Enterprise Tier: Custom - Unlimited - Custom ZK circuits, dedicated SLA, white-label
Think of us as "Auth0 for Web3" — essential infrastructure for secure user verification.

ZK Circuit Details
Supported Credentials
Power User: history > 365 days → Airdrop eligibility
NFT Holder: owns(collection_id) → Token-gated communities
Transaction Volume: tx_count > 1000 → Whale verification
Custom: Developer-defined → Enterprise clients
Circuit Components
circuits/
├── repute.circom              # Main circuit definition
├── repute.wasm                # Compiled WASM prover
├── verification_key.json      # Public verification key
└── repute_final.zkey          # Proving key
Generate Proof
bashcd circuits
node generate_proof.js --wallet <PUBLIC_KEY> --credential POWER_USER
# Outputs: proof.json + public.json

Deployment
Frontend (Vercel)
bashcd frontend
vercel --prod
Environment Variables:

NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RELAYER_URL=https://your-relayer.onrender.com

Relayer (Render.com)
bashcd relayer
# Push to GitHub, connect to Render
Environment Variable:

RELAYER_SECRET_KEY=[keypair array]

Solana Program
bashsolana config set --url https://api.devnet.solana.com
anchor deploy --provider.cluster devnet

Project Structure
reputev2/
├── circuits/                 # ZK circuit definitions
│   ├── repute.circom        # Circom circuit
│   ├── repute.wasm          # Compiled prover
│   └── verification_key.json
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   │   └── zk/             # ZK proof generation
│   └── public/             # Static assets
├── relayer/                 # Backend service
│   └── server.js           # Express API
└── sdk/                    # Developer SDK
    └── src/
        └── index.tsx       # ReputeGate component

Testing
Run Unit Tests:
bashnpm test
Test ZK Circuit:
bashcd circuits
npm run test:circuit
Test Full Flow (E2E):
bashnpm run test:e2e

Contributing
We welcome contributions!

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request


License
This project is licensed under the MIT License - see the LICENSE file for details.

Roadmap
Phase 1: MVP (Current)

Core ZK circuits (Power User credential)
Solana devnet deployment
Basic SDK (ReputeGate component)
Relayer infrastructure

Phase 2: Mainnet Launch (Q2 2025)

Mainnet deployment
5+ credential types (NFT holder, transaction volume, etc.)
Advanced analytics dashboard
Partnership with 3 major dApps

Phase 3: Ecosystem Growth (Q3 2025)

Cross-chain support (Ethereum, Polygon)
Custom circuit builder (no-code)
Reputation marketplace
100+ integrated dApps


Links
GitHub: https://github.com/thesfb/reputev2
Live Demo: https://repute.vercel.app
Solana Explorer (Devnet): https://explorer.solana.com/?cluster=devnet

Support
Issues: https://github.com/thesfb/reputev2/issues
Email: support@repute.protocol

Acknowledgments

Circom/snarkjs - ZK-SNARK toolkit by iden3
Solana Foundation - Blockchain infrastructure
Metaplex - NFT standard
Vercel - Hosting platform


Disclaimer
This project is currently in beta on Solana Devnet. Use at your own risk. Not audited for production use.

Built for the Web3 community
Problem • Solution • Get Started • Integrate • Roadmap
