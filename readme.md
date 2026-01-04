 # 🛡️ Repute Protocol

**Zero-Knowledge Reputation System for Solana**

Prove your on-chain credentials without exposing your wallet. Mint privacy-preserving reputation badges that work across the entire Solana ecosystem.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solana](https://img.shields.io/badge/Solana-Native-9945FF)](https://solana.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)](https://www.typescriptlang.org/)

---

## 🎯 What is Repute?

Repute is a privacy-first reputation protocol that lets users prove credentials from their main wallet and mint verified badges to a fresh burner wallet—**with zero on-chain linkability**.

**The Problem:** Connecting your valuable wallet to every dApp is dangerous. $2B+ stolen in 2024 from malicious signatures. But you need to prove you're not a bot.

**The Solution:** Zero-knowledge proofs. Prove you're a Jupiter power user, MadLads holder, or Solana OG **without revealing which wallet**.

---

## ✨ Key Features

### For Users
- 🔒 **Privacy-Preserving** - Main wallet never exposed, mathematically unlinkable
- 🎫 **NFT Badges** - Composable reputation that works across all dApps
- 🛡️ **Security** - Keep your vault wallet safe, use burner wallets worry-free
- 🚫 **Sybil-Resistant** - Can't fake transaction history, one badge per wallet
- ⚡ **Fast** - Generate proofs in 10-30 seconds, mint instantly

### For Developers
- 🧩 **Drop-in SDK** - React component + REST API, 5-minute integration
- 🔍 **Verify Without Seeing** - Check credentials without knowing user identities
- 🌐 **Language Agnostic** - Works with JavaScript, Python, Rust, any HTTP client
- 💰 **No Gas Management** - Relayer handles all blockchain transactions
- 📊 **Rich Criteria** - Jupiter users, NFT holders, wallet age, DeFi activity, custom logic

---

## 🚀 Quick Start

### For Users


1. Connect your main wallet (Phantom/Solflare)
2. Select criteria (e.g., "Jupiter Power User")
3. Generate zero-knowledge proof (30 seconds)
4. Enter your burner wallet address
5. Receive badge NFT on burner wallet
6. Use burner wallet everywhere safely

**Your main wallet is never exposed. The link is cryptographically impossible to trace.**

---

### For Developers

#### Option 1: React Component (Easiest)

```bash
npm install @repute-protocol/react
```

```tsx
import { ReputeGate } from '@repute-protocol/react';

export function VotingPage() {
  return (
    <ReputeGate criteria="jupiter-power-user">
      {/* Only shown to verified users */}
      <VotingInterface />
    </ReputeGate>
  );
}
```

#### Option 2: REST API (Any Language)

```javascript
const response = await fetch(
  'https://api.repute.xyz/verify?address=WALLET&criteria=jupiter-power-user'
);

const { verified, badge } = await response.json();

if (verified) {
  grantAccess();
}
```

#### Option 3: Relayer Service (Custom Badges)

```javascript
const response = await fetch('https://api.repute.xyz/api/mint', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: JSON.stringify({
    proof: userProof,
    destinationAddress: userBurnerWallet,
    criteria: 'your-custom-criteria'
  })
});
```

---

## 🎓 Available Criteria

| Criteria | Description | Use Case |
|----------|-------------|----------|
| `jupiter-power-user` | Used Jupiter before 2024 | Early adopter verification |
| `solana-og` | Wallet age > 1 year | Veteran community member |
| `madlads-holder` | Owns MadLads NFT | Exclusive NFT holder access |
| `multi-protocol-user` | Used 5+ DeFi protocols | Experienced trader |
| `whale-holder` | Holdings > $100K | High-value user identification |
| `defi-native` | Completed 100+ DeFi txns | Active protocol participant |
| **Custom** | Your own criteria | Enterprise-specific requirements |

---

## 🔐 How It Works

### The Zero-Knowledge Magic

```
Traditional Verification (UNSAFE):
User → Connects Main Wallet → dApp sees everything → ❌ Privacy lost

Repute (SAFE):
User → Generates ZK Proof → Badge minted to burner → ✅ Privacy preserved
       (proves credential)    (no link visible)
```

### Technical Flow

1. **Client-Side Proof Generation** - User's browser creates cryptographic proof using Circom + snarkjs (Groth16)
2. **Zero-Knowledge Property** - Proof says "I meet criteria" without revealing which wallet
3. **Nullifier System** - Prevents double-claiming while maintaining unlinkability
4. **Backend Verification** - Server validates proof mathematically, cannot reverse-engineer wallet
5. **NFT Minting** - Badge minted to user's chosen burner wallet via Metaplex
6. **Composability** - Badge works across any dApp that integrates Repute SDK

**Result:** Nobody can link your main wallet to your burner wallet. Not the public, not Repute, not even with infinite compute.

---

## 🛠️ Use Cases

### Gaming
- Prove veteran status without exposing valuable NFT collection
- Gate special items for experienced players
- Connect safely to risky new games

### DAO Governance
- Anonymous voting with verified credentials
- Token holder verification without wallet exposure
- Prevent Sybil attacks in governance

### Airdrops & Rewards
- Prove eligibility from burner wallet
- Claim from fresh address for safety
- Bot farms can't fake transaction history

### NFT Mints
- Access exclusive mints with verified holdings
- Keep your valuable collection private
- Mint from disposable wallets

### DeFi Protocols
- Tiered access based on trading history
- Whale verification without doxxing
- Protocol-specific reputation scores

---

## 🏗️ Architecture

### Tech Stack
- **Frontend:** React, TypeScript, Wallet Adapter
- **ZK Proofs:** Circom circuits, snarkjs (Groth16)
- **Blockchain:** Solana, Metaplex NFT Standard
- **Backend:** Node.js, Express, PostgreSQL
- **Relayer:** Custom Solana transaction relayer

### System Components

```
┌─────────────────────────────────────────┐
│         User Browser (Client)            │
│  - Wallet connection (Phantom/Solflare) │
│  - Transaction history fetch             │
│  - ZK proof generation (snarkjs)        │
│  - Nullifier derivation                  │
└──────────────────┬──────────────────────┘
                   │ Proof + Destination Address
                   ▼
┌─────────────────────────────────────────┐
│         Repute Backend (Server)          │
│  - Proof verification (groth16)         │
│  - Nullifier uniqueness check            │
│  - Badge NFT minting (Metaplex)         │
│  - Relayer transaction signing           │
└──────────────────┬──────────────────────┘
                   │ Mint Transaction
                   ▼
┌─────────────────────────────────────────┐
│           Solana Blockchain              │
│  - NFT minted to burner wallet          │
│  - Badge metadata stored on-chain       │
│  - No link to source wallet visible     │
└─────────────────────────────────────────┘
```

---

## 📦 SDK Reference

### React Component API

```tsx
<ReputeGate
  criteria="jupiter-power-user"        // Required: Badge criteria to check
  fallback={<GetVerifiedPrompt />}     // Optional: Component shown when not verified
  loading={<LoadingSpinner />}         // Optional: Loading state component
  onVerified={(badge) => console.log(badge)} // Optional: Callback on verification
>
  {/* Protected content */}
</ReputeGate>
```

### REST API Endpoints

#### Verify Badge
```
GET /api/verify?address={wallet}&criteria={criteria}

Response:
{
  "verified": boolean,
  "badge": {
    "criteria": string,
    "mintAddress": string,
    "issuedAt": string
  } | null
}
```

#### Mint Badge
```
POST /api/mint
Authorization: Bearer {API_KEY}

Body:
{
  "proof": string,
  "nullifier": string,
  "destinationAddress": string,
  "criteria": string
}

Response:
{
  "success": boolean,
  "txSignature": string,
  "mintAddress": string
}
```

#### List Criteria
```
GET /api/criteria

Response:
{
  "criteria": [
    {
      "id": string,
      "name": string,
      "description": string,
      "requirements": object
    }
  ]
}
```

---

## 💰 Pricing

| Plan | Price | Verifications | Features |
|------|-------|---------------|----------|
| **Free** | $0/mo | 100/month | Basic criteria, Community support |
| **Starter** | $49/mo | 10,000/month | All criteria, Email support |
| **Pro** | $299/mo | 100,000/month | Custom criteria, Analytics, Priority support |
| **Enterprise** | Custom | Unlimited | Dedicated relayer, SLA, White-label |

---

## 🔒 Security

### Cryptographic Guarantees
- **Zero-Knowledge:** Proofs reveal no information about source wallet
- **Unlinkability:** Mathematically impossible to connect wallets
- **Sybil-Resistance:** Nullifiers prevent double-claiming per wallet
- **Non-Repudiation:** Proofs are cryptographically verifiable

### Privacy Model
- Main wallet connection is **client-side only** (never sent to server)
- Transaction history is **processed locally** in browser
- ZK proof is **generated in browser** (no data leaves device)
- Server receives **only the proof** (no wallet addresses)
- On-chain transactions **contain no identifying information**

### Audit Status
- 🔄 Smart contracts: Audited by [Audit Firm] (Q2 2025)
- 🔄 ZK circuits: Formal verification in progress
- 🔄 Backend: Security review by [Security Firm]

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone repository
git clone https://github.com/repute-protocol/repute.git
cd repute

# Install dependencies
npm install

# Set environment variables
cp .env.example .env

# Run development server
npm run dev

# Run tests
npm test
```

### Project Structure

```
repute/
├── packages/
│   ├── circuits/          # Circom ZK circuits
│   ├── sdk-react/         # React SDK
│   ├── sdk-js/            # JavaScript SDK
│   └── backend/           # Node.js backend
├── apps/
│   ├── web/               # Frontend application
│   └── docs/              # Documentation site
└── examples/
    ├── nextjs/            # Next.js integration example
    ├── python/            # Python backend example
    └── rust/              # Rust integration example
```

---

## 📚 Resources

- 📖 **Documentation:** [docs.repute.xyz](https://docs.repute.xyz)
- 🎮 **Playground:** [playground.repute.xyz](https://playground.repute.xyz)
- 💬 **Discord:** [discord.gg/repute](https://discord.gg/repute)
- 🐦 **Twitter:** [@ReputeProtocol](https://twitter.com/ReputeProtocol)
- 📧 **Email:** hello@repute.xyz

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **Circom & snarkjs** - ZK proof infrastructure
- **Solana Foundation** - Blockchain infrastructure
- **Metaplex** - NFT standard and tooling
- **Sismo** - Inspiration for ZK attestations on Ethereum

---

## ⚠️ Disclaimer

Repute Protocol is in active development. Use at your own risk. While we employ industry-standard cryptography and security practices, no system is 100% secure. Always perform your own security review before integrating into production applications.

---

**Built with ❤️ for the Solana ecosystem**
