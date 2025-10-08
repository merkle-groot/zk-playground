const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const { hash } = require("./testHelpers/eddsaSign");
const assert = chai.assert;
let circuit = null;

before(async function(){
    this.timeout(100000);
    circuit = await wasm_tester(path.join(__dirname, "../src/wordle.circom"), {
        verbose: true
    });
});

describe("Wordle circuit test", function(){
    this.timeout(100000);

    it("1 bull 2 cows", async function(){
        const solutionHash = await hash(Array.from("TRAIN", x => x.charCodeAt(0)));
        const witness = await circuit.calculateWitness({
            solutionHash: solutionHash,
            solution: Array.from("TRAIN", x => x.charCodeAt(0)),
            guess: Array.from("PLANT", x => x.charCodeAt(0))
        });

        assert.deepStrictEqual(witness.slice(1, 6), [0n, 0n, 2n, 1n, 1n]);
        console.log("Circuit output (poseidon hash):", );
        await circuit.checkConstraints(witness);
    });

    it("5 bull 0 cows", async function(){
        const solutionHash = await hash(Array.from("ANNOY", x => x.charCodeAt(0)));
        const witness = await circuit.calculateWitness({
            solutionHash: solutionHash,
            solution: Array.from("ANNOY", x => x.charCodeAt(0)),
            guess: Array.from("ANNOY", x => x.charCodeAt(0))
        });

        assert.deepStrictEqual(witness.slice(1, 6), [2n, 2n, 2n, 2n, 2n]);
        console.log("Circuit output (poseidon hash):", );
        await circuit.checkConstraints(witness);

    });

    it("0 bulls 0 cows", async function(){
        const solutionHash = await hash(Array.from("ANNOY", x => x.charCodeAt(0)));
        const witness = await circuit.calculateWitness({
            solutionHash: solutionHash,
            solution: Array.from("ANNOY", x => x.charCodeAt(0)),
            guess: Array.from("LISTS", x => x.charCodeAt(0))
        });

        assert.deepStrictEqual(witness.slice(1, 6), [0n, 0n, 0n, 0n, 0n]);
        console.log("Circuit output (poseidon hash):", );
        await circuit.checkConstraints(witness);

    });

    it("0 bulls 5 cows", async function(){
        const solutionHash = await hash(Array.from("BLEAT", x => x.charCodeAt(0)));
        const witness = await circuit.calculateWitness({
            solutionHash: solutionHash,
            solution: Array.from("BLEAT", x => x.charCodeAt(0)),
            guess: Array.from("TABLE", x => x.charCodeAt(0))
        });

        assert.deepStrictEqual(witness.slice(1, 6), [1n, 1n, 1n, 1n, 1n]);
        console.log("Circuit output (poseidon hash):", );
        await circuit.checkConstraints(witness);

    });
});