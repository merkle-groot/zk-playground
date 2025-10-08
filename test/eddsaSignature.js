const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const { hash, generateKeypair, sign, toField, verify, convertToPoseidonObject } = require("./testHelpers/eddsaSign");
const assert = chai.assert;

let circuit = null;

before(async function(){
    this.timeout(100000);
    circuit = await wasm_tester(path.join(__dirname, "../src/eddsaposeidon.circom"), {
        verbose: true
    });
});

describe("Eddsa circuit test", function(){
    this.timeout(100000);

    it("should print poseidon hash", async function(){
        const { privateKeyBytes: privBytesAlice, publicKeyBytes: pubBytesAlice, privateKey: privAlice, publicKey: pubAlice } = await generateKeypair("alice keypair");
        const { privateKeyBytes: privBytesBob, publicKeyBytes: pubBytesBob, privateKey: privBob, publicKey: pubBob } = await generateKeypair("alice key");
        const amount = 10**18;
        const hashedTx = await hash([pubAlice[0], pubAlice[1], pubBob[0], pubBob[1], amount]);
        const signatureAlice = await sign(privBytesAlice, hashedTx.toString());
        const signatureRField = [
            await convertToPoseidonObject(signatureAlice.R8[0]),
            await convertToPoseidonObject(signatureAlice.R8[1])
        ];

        // await verify(hashedTx, signatureAlice, pubBytesAlice);

        const witness = await circuit.calculateWitness({
            sender: pubAlice,
            receiver: pubBob,
            amount: amount,
            signatureR: signatureRField,
            signatureS: signatureAlice.S
        });

        console.log("Circuit output (poseidon hash):", witness[1]);
        await circuit.checkConstraints(witness);
    });
});