const chai = require("chai");
const path = require("path");
const wasm_tester = require("circom_tester").wasm;
const assert = chai.assert;

describe("Greatest number testing", function () {
    this.timeout(100000);

    describe("Length 2 array", function() {
        let circuit = null;
        // Before all tests, compile the circuit once
        before(async function() {
            this.timeout(100000);
            circuit = await wasm_tester(path.join(__dirname, "../src/GreatestTestCircuits/greatest2.circom"));
        });

        it("Should give greatest 1", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [14n, 15n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 15n);
        });

        it("Should give greatest 2", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [0n, 1n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 1n);
        });

        it("Should give greatest 3", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [100n, 5n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 100n);
        });
    });

    describe("Length 3 array", function() {
        let circuit = null;
        // Before all tests, compile the circuit once
        before(async function() {
            this.timeout(100000);
            circuit = await wasm_tester(path.join(__dirname, "../src/GreatestTestCircuits/greatest3.circom"));
        });

        it("Should give greatest 1", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [14n, 15n, 16n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 16n);
        });

        it("Should give greatest 2", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [2n, 1n, 0n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 2n);
        });

        it("Should give greatest 3", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [100n, 5n, 25n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 100n);
        });
    });

    describe("Length 3 array", function() {
        let circuit = null;
        // Before all tests, compile the circuit once
        before(async function() {
            this.timeout(100000);
            circuit = await wasm_tester(path.join(__dirname, "../src/GreatestTestCircuits/greatest4.circom"));
        });

        it("Should give greatest 1", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [14n, 15n, 16n, 17n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 17n);
        });

        it("Should give greatest 2", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [2n, 3n, 0n, 1n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 3n);
        });

        it("Should give greatest 3", async function(){
            const witness = await circuit.calculateWitness({
                numbers: [100n, 5n, 150n, 25n]
            });

            await circuit.checkConstraints(witness);
            assert.equal(witness[1], 150n);
        });
    });
});