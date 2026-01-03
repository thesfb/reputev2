import { NextResponse } from "next/server";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCore, getAssetV1GpaBuilder, Key } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";

export async function POST(req: Request) {
  // Handle CORS
  const headers = {
    "Access-Control-Allow-Origin": "*", // Allow ANY website to check reputation
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { headers });
  }

  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Address required" }, { status: 400, headers });
    }

    // 1. Setup Umi (Read-only)
    // Use a public RPC or your Helius/QuickNode one
    const rpcUrl = process.env.RPC_URL || "https://api.devnet.solana.com";
    const umi = createUmi(rpcUrl).use(mplCore());

    // 2. Fetch Assets
    const assets = await getAssetV1GpaBuilder(umi)
      .whereField("key", Key.AssetV1)
      .whereField("owner", publicKey(address))
      .getDeserialized();

    // 3. Filter for Badge
    const hasBadge = assets.some((asset) => asset.name === "Repute: Power User");

    if (hasBadge) {
      return NextResponse.json({ 
        verified: true, 
        badge: "Repute: Power User",
        message: "User has valid reputation." 
      }, { headers });
    } else {
      return NextResponse.json({ 
        verified: false, 
        message: "No Repute badge found." 
      }, { status: 401, headers });
    }

  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers });
  }
}

// Handle OPTIONS requests explicitly (for CORS preflight checks)
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}