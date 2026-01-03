import { NextResponse } from "next/server";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
  createSignerFromKeypair, 
  signerIdentity, 
  generateSigner, 
  publicKey 
} from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
import * as snarkjs from "snarkjs";
// Ensure you have moved the verification_key.json to this path
import vKey from "@/lib/zk/verification_key.json"; 

// MOCK DATABASE: Resets when server restarts. Use Redis in production.
const USED_NULLIFIERS = new Set<string>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { proof, publicSignals, destinationAddress } = body;

    // 1. Validate Inputs
    if (!proof || !publicSignals || !destinationAddress) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    const nullifierHash = publicSignals[0];

    // 2. Prevent Double-Spending
    if (USED_NULLIFIERS.has(nullifierHash)) {
      return NextResponse.json(
        { error: "Reputation already ported (Nullifier used)" }, 
        { status: 400 }
      );
    }

    // 3. Verify ZK Proof
    const verified = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (!verified) {
      return NextResponse.json({ error: "Invalid ZK Proof" }, { status: 401 });
    }

    // 4. Initialize Solana Relayer
    if (!process.env.RELAYER_PRIVATE_KEY) {
      throw new Error("RELAYER_PRIVATE_KEY is not defined in .env");
    }

    // Connect to RPC (Localhost or Devnet)
    const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8899";
    const umi = createUmi(rpcUrl).use(mplCore());

    // Load Relayer Wallet
    const relayerKeypair = umi.eddsa.createKeypairFromSecretKey(
      new Uint8Array(JSON.parse(process.env.RELAYER_PRIVATE_KEY))
    );
    const relayerSigner = createSignerFromKeypair(umi, relayerKeypair);
    umi.use(signerIdentity(relayerSigner));

    // 5. Mint Soulbound Badge (Optimized for Speed)
    const assetSigner = generateSigner(umi);

    console.log(`Minting badge to ${destinationAddress}...`);

    const tx = await create(umi, {
      asset: assetSigner,
      name: "Repute: Jupiter Power User",
      uri: "https://shdw-drive.genesysgo.net/6K.../metadata.json", // Replace with your metadata
      owner: publicKey(destinationAddress), 
    }).sendAndConfirm(umi, { 
      send: { 
        skipPreflight: true, // Don't simulate, just send
      }, 
      confirm: { 
        commitment: 'processed', // Fastest confirmation (fixes the timeout issue)
      } 
    });

    // 6. Record Nullifier as Used
    USED_NULLIFIERS.add(nullifierHash);

    // 7. Return Success
    const signature = Buffer.from(tx.signature).toString('hex');

    return NextResponse.json({ 
      success: true, 
      txHash: signature,
      assetAddress: assetSigner.publicKey.toString() 
    });

  } catch (error: any) {
    console.error("Relayer Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}