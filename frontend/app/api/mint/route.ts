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
import vKey from "@/lib/zk/verification_key.json"; 

const USED_NULLIFIERS = new Set<string>();

// Ensure this matches your uploaded Metadata URL
const METADATA_URI = "https://raw.githubusercontent.com/thesfb/repute-assets/refs/heads/main/metadata.json";

export async function POST(req: Request) {
  console.log("------------------------------------------");
  console.log("🟢 1. API Route Hit: Received Mint Request");

  try {
    const body = await req.json();
    const { proof, publicSignals, destinationAddress } = body;

    // 1. Validate Inputs
    if (!proof || !publicSignals || !destinationAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const nullifierHash = publicSignals[0];
    console.log("🔵 2. Nullifier:", nullifierHash);

    // 2. Prevent Double-Spending
    if (USED_NULLIFIERS.has(nullifierHash)) {
      return NextResponse.json({ error: "Reputation already ported" }, { status: 400 });
    }

    // 3. Verify ZK Proof
    console.log("🟡 3. Starting ZK Verification...");
    const verified = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    console.log("🟢 4. ZK Verification Result:", verified);

    if (!verified) {
      return NextResponse.json({ error: "Invalid ZK Proof" }, { status: 401 });
    }

    // 4. Initialize Solana Relayer
    if (!process.env.RELAYER_PRIVATE_KEY) {
      throw new Error("RELAYER_PRIVATE_KEY is missing in .env");
    }

    // Connect to RPC
    const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8899";
    console.log(`🟡 5. Connecting to Solana RPC at ${rpcUrl}...`);
    
    const umi = createUmi(rpcUrl).use(mplCore());

    const relayerKeypair = umi.eddsa.createKeypairFromSecretKey(
      new Uint8Array(JSON.parse(process.env.RELAYER_PRIVATE_KEY))
    );
    const relayerSigner = createSignerFromKeypair(umi, relayerKeypair);
    umi.use(signerIdentity(relayerSigner));

    // 5. Mint Soulbound Badge
    const assetSigner = generateSigner(umi);
    console.log(`🟡 6. Sending Mint Transaction to ${destinationAddress}...`);

    // --- CRASH PROOF FIX: Manual Polling instead of sendAndConfirm ---
    
    // 1. Build the transaction
    const builder = create(umi, {
      asset: assetSigner,
      name: "Repute: Power User",
      uri: METADATA_URI,
      owner: publicKey(destinationAddress), 
    });

    // 2. Send only (No confirmation waiting yet)
    const signature = await builder.send(umi, { 
      skipPreflight: true 
    });
    
    // Convert signature to string for logging
    const signatureHex = Buffer.from(signature).toString('hex');
    console.log(`🟡 7. Tx Sent! Waiting for confirmation (Polling)... Tx: ${signatureHex}`);

    // 3. Manual Polling Loop (Bypasses WebSocket Crash)
    let confirmed = false;
    for (let i = 0; i < 30; i++) { // Try for 30 seconds
      const statuses = await umi.rpc.getSignatureStatuses([signature]);
      const status = statuses[0];

      if (status && (status.confirmationStatus === 'processed' || status.confirmationStatus === 'confirmed' || status.confirmationStatus === 'finalized')) {
        confirmed = true;
        console.log(`🟢 8. Confirmed via Polling! Status: ${status.confirmationStatus}`);
        break;
      }
      
      // Wait 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!confirmed) {
      console.log("🟠 Warning: Polling timed out, but Tx likely sent.");
    }

    // 6. Record Nullifier
    USED_NULLIFIERS.add(nullifierHash);

    return NextResponse.json({ 
      success: true, 
      txHash: signatureHex,
      assetAddress: assetSigner.publicKey.toString() 
    });

  } catch (error: any) {
    console.error("🔴 CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}