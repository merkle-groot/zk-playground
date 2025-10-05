const buildEddsa = require("circomlibjs").buildEddsa;

async function generateKeypair() {
    console.log("Generating BabyJubJub keypair...");

    // Initialize EdDSA with BabyJubJub
    const eddsa = await buildEddsa();

    // Generate random private key (32 bytes)
    const privateKey = Array.from({length: 32}, () => Math.floor(Math.random() * 256));

    // Derive public key from private key
    const publicKey = eddsa.prv2pub(privateKey);

    console.log("Private Key (hex):", Buffer.from(privateKey).toString('hex'));
    console.log("Private Key (array):", privateKey);
    console.log("Public Key (x):", eddsa.F.toObject(publicKey[0]).toString());
    console.log("Public Key (y):", eddsa.F.toObject(publicKey[1]).toString());
    console.log("Public Key (hex):", [
        eddsa.F.toObject(publicKey[0]).toString(16),
        eddsa.F.toObject(publicKey[1]).toString(16)
    ]);

    return {
        privateKey: privateKey,
        publicKey: publicKey
    };
}

// Alternative: Use a deterministic private key for testing
async function generateDeterministicKeypair(seed) {
    console.log("Generating deterministic BabyJubJub keypair from seed:", seed);

    const eddsa = await buildEddsa();

    // Use seed to generate private key (simple approach - in production use proper KDF)
    const privateKey = Array.from(seed.padEnd(32, '0').slice(0, 32)).map(char => char.charCodeAt(0));

    const publicKey = eddsa.prv2pub(privateKey);

    console.log("Seed:", seed);
    console.log("Private Key (hex):", Buffer.from(privateKey).toString('hex'));
    console.log("Public Key (x):", eddsa.F.toObject(publicKey[0]).toString());
    console.log("Public Key (y):", eddsa.F.toObject(publicKey[1]).toString());

    return {
        privateKey: privateKey,
        publicKey: publicKey
    };
}

// Run the key generation
if (require.main === module) {
    generateKeypair().then(() => {
        console.log("\nDeterministic example:");
        return generateDeterministicKeypair("my_secret_seed_123");
    }).catch(console.error);
}

module.exports = { generateKeypair, generateDeterministicKeypair };