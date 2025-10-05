const buildEddsa = require("circomlibjs").buildEddsa;

async function signingExample() {
    console.log("=== BabyJubJub EdDSA Signing Example ===\n");

    // Initialize EdDSA
    const eddsa = await buildEddsa();

    // Generate keypair
    const privateKey = Array.from({length: 32}, () => Math.floor(Math.random() * 256));
    const publicKey = eddsa.prv2pub(privateKey);

    console.log("Generated keypair:");
    console.log("Private Key (hex):", Buffer.from(privateKey).toString('hex'));
    console.log("Public Key (x):", eddsa.F.toObject(publicKey[0]).toString());
    console.log("Public Key (y):", eddsa.F.toObject(publicKey[1]).toString());
    console.log();

    // Message to sign (as a big integer in the field)
    const message = eddsa.F.e(123456789);
    console.log("Message to sign:", eddsa.F.toObject(message).toString());
    console.log();

    // Sign the message using Poseidon hash
    console.log("Signing with Poseidon hash...");
    const signature = eddsa.signPoseidon(privateKey, message);
    console.log("Signature:");
    console.log("  R8.x:", eddsa.F.toObject(signature.R8[0]).toString());
    console.log("  R8.y:", eddsa.F.toObject(signature.R8[1]).toString());
    console.log("  S:", signature.S.toString());
    console.log();

    // Verify the signature
    console.log("Verifying signature...");
    const isValid = eddsa.verifyPoseidon(message, signature, publicKey);
    console.log("Signature valid:", isValid);
    console.log();

    // Test with wrong message (should fail)
    console.log("Testing with wrong message...");
    const wrongMessage = eddsa.F.e(987654321);
    const isValidWrong = eddsa.verifyPoseidon(wrongMessage, signature, publicKey);
    console.log("Wrong message signature valid:", isValidWrong);
    console.log();

    // Pack and unpack signature
    console.log("Packing signature...");
    const packedSig = eddsa.packSignature(signature);
    console.log("Packed signature (hex):", Buffer.from(packedSig).toString('hex'));

    const unpackedSig = eddsa.unpackSignature(packedSig);
    console.log("Unpacked signature matches:",
        eddsa.F.eq(signature.R8[0], unpackedSig.R8[0]) &&
        eddsa.F.eq(signature.R8[1], unpackedSig.R8[1]) &&
        signature.S === unpackedSig.S
    );

    return {
        privateKey: privateKey,
        publicKey: publicKey,
        message: message,
        signature: signature,
        packedSignature: packedSig
    };
}

if (require.main === module) {
    signingExample().catch(console.error);
}

module.exports = { signingExample };