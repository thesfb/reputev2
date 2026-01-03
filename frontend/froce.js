const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

// YOUR RELAYER ADDRESS
const ADDRESS = "xEAqnKr7P5JZRxTP8AWHKQTPzpH7bknQoyFkxjSpcTm";

(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const publicKey = new PublicKey(ADDRESS);

    console.log(`🔨 Hammering the faucet for ${ADDRESS}...`);

    for (let i = 0; i < 10; i++) {
        try {
            console.log(`Attempt ${i + 1}: Requesting 1 SOL...`);
            const signature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);

            console.log("✅ Success! Tx:", signature);
            console.log("Waiting for confirmation...");

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

            console.log("💰 Airdrop Confirmed! You are ready.");
            return; // Exit on success
        } catch (e) {
            console.log(`❌ Failed (Rate limited?). Retrying in 5 seconds...`);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
    console.log("Give up for now. Try https://faucet.helius.xyz manually.");
})();