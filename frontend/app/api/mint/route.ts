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
// We import the key directly to avoid filesystem issues in serverless environments
import vKey from "@/lib/zk/verification_key.json"; 

// --- CONFIGURATION ---
// In a real app, use a database (Redis/Postgres) for nullifiers.
// For this hackathon demo, we use an in-memory Set (resets on server restart).
const USED_NULLIFIERS = new Set<string>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { proof, publicSignals, destinationAddress } = body;

    // 1. Validate Inputs
    if (!proof || !publicSignals || !destinationAddress) {
      return NextResponse.json(
        { error: "Missing required fields: proof, publicSignals, or destinationAddress" }, 
        { status: 400 }
      );
    }

    // publicSignals[0] is the nullifierHash (output of our circuit)
    const nullifierHash = publicSignals[0];

    // 2. Prevent Double-Spending
    if (USED_NULLIFIERS.has(nullifierHash)) {
      return NextResponse.json(
        { error: "This reputation has already been ported!" }, 
        { status: 400 }
      );
    }

    // 3. Verify the ZK Proof
    // snarkjs.groth16.verify(vKey, publicSignals, proof)
    const verified = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (!verified) {
      return NextResponse.json({ error: "Invalid ZK Proof" }, { status: 401 });
    }

    // 4. Initialize Solana Relayer
    // Note: RELAYER_PRIVATE_KEY must be a JSON array string in .env: "[23, 111, ...]"
    if (!process.env.RELAYER_PRIVATE_KEY) {
      throw new Error("RELAYER_PRIVATE_KEY is not defined in .env");
    }

    const rpcUrl = process.env.RPC_URL || "https://api.devnet.solana.com";
    const umi = createUmi(rpcUrl).use(mplCore());

    const relayerKeypair = umi.eddsa.createKeypairFromSecretKey(
      new Uint8Array(JSON.parse(process.env.RELAYER_PRIVATE_KEY))
    );
    const relayerSigner = createSignerFromKeypair(umi, relayerKeypair);
    umi.use(signerIdentity(relayerSigner));

    // 5. Mint the Soulbound Badge (MPL-Core Asset)
    // We generate a new signer for the Asset itself
    const assetSigner = generateSigner(umi);

    console.log(`Minting badge to ${destinationAddress}...`);

    const tx = await create(umi, {
      asset: assetSigner,
      name: "Repute: Jupiter Power User",
      uri: "https://example.com/metadata.json", // TODO: Replace with your actual metadata URL
      owner: publicKey(destinationAddress), // Sent to the user's fresh wallet
    }).sendAndConfirm(umi);

    // 6. Record Nullifier as Used
    USED_NULLIFIERS.add(nullifierHash);

    // 7. Return Success
    // We convert the signature (Uint8Array) to a string for the response
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