const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;

let circuit = null;

before(async function(){
    this.timeout(100000);
    circuit = await wasm_tester(path.join(__dirname, "../src/wordle.circom"), {
        verbose: true
    });
});

describe("Wordle circuit test", function(){
    this.timeout(100000);

    it("should print poseidon hash", async function(){
        const witness = await circuit.calculateWitness({
            solution: Array.from("TRAIN", x => x.charCodeAt(0)),
            guess: Array.from("PLANT", x => x.charCodeAt(0))
        });

        console.log("Circuit output (poseidon hash):", witness.slice(1, 6));
        await circuit.checkConstraints(witness);
    });
});