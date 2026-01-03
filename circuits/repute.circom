pragma circom 2.0.0;

// Import Poseidon from circomlib (standard, efficient hash for ZK)
include "node_modules/circomlib/circuits/poseidon.circom";

template Repute() {
    // Private Input: The secret derived from the user's wallet signature
    signal input secret;

    // Public Output: The Nullifier Hash (used to prevent double-minting)
    signal output nullifierHash;

    // 1. Calculate the Nullifier Hash using Poseidon
    // Poseidon(1) takes 1 input array and outputs 1 hash
    component hasher = Poseidon(1);
    hasher.inputs[0] <== secret;
    
    // 2. Assign the output
    nullifierHash <== hasher.out;
}

// Main component
component main = Repute();