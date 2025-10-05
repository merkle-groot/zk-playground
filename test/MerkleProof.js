const chai = require("chai");
const path = require("path");
const merkleTreeHelper = require("./testHelpers/merkleTree");
const wasm_tester = require("circom_tester").wasm;
const assert = chai.assert;

describe("Merkle proof testing", function () {
    this.timeout(100000);

    describe("Height 1 tree", function () {
        let circuit = null;

        before(async function() {
            circuit = await wasm_tester(path.join(__dirname, "../src/MerkleProofTestCircuits/MerkleProofHeight1.circom"));
        });

        it("Should validate height 1 tree", async function (){
            const height = 1;
            const elementIndex = 0;
            const tree = await merkleTreeHelper.buildTree(height);

            const {isLeft, siblings} = await merkleTreeHelper.genRouteAndIsLeft(tree, height, elementIndex);

            console.log("Height 1 - isLeft:", isLeft);
            console.log("Height 1 - siblings:", siblings);
            console.log("Height 1 - tree", tree);

            const witness = await circuit.calculateWitness({
                root: tree[tree.length - 1].toString(),
                element: elementIndex.toString(),
                siblings: siblings.map((num) => num.toString()),
                isLeft: isLeft.map((num) => num.toString()),
                nLevelsUsed: height
            });
            await circuit.checkConstraints(witness);
        });
    });

    describe("Height 2 tree", function () {
        let circuit = null;

        before(async function() {
            circuit = await wasm_tester(path.join(__dirname, "../src/MerkleProofTestCircuits/MerkleProofHeight2.circom"));
        });

        it("Should validate height 2 tree", async function (){
            const height = 2;
            const elementIndex = 0;
            const tree = await merkleTreeHelper.buildTree(height);

            const {isLeft, siblings} = await merkleTreeHelper.genRouteAndIsLeft(tree, height, elementIndex);

            console.log("Height 2 - isLeft:", isLeft);
            console.log("Height 2 - siblings:", siblings);
            console.log("Height 2 - tree", tree);

            const witness = await circuit.calculateWitness({
                root: tree[tree.length - 1].toString(),
                element: elementIndex.toString(),
                siblings: siblings.map((num) => num.toString()),
                isLeft: isLeft.map((num) => num.toString()),
                nLevelsUsed: height
            });
            await circuit.checkConstraints(witness);
        });
    });

    describe("Height 3 tree", function () {
        let circuit = null;

        before(async function() {
            circuit = await wasm_tester(path.join(__dirname, "../src/MerkleProofTestCircuits/MerkleProofHeight3.circom"));
        });

        it("Should validate height 3 tree index 4", async function (){
            const height = 3;
            const elementIndex = 4;
            const tree = await merkleTreeHelper.buildTree(height);

            const {isLeft, siblings} = await merkleTreeHelper.genRouteAndIsLeft(tree, height, elementIndex);

            console.log("Height 3 - isLeft:", isLeft);
            console.log("Height 3 - siblings:", siblings);
            console.log("Height 3 - tree length:", tree.length);

            const witness = await circuit.calculateWitness({
                root: tree[tree.length - 1].toString(),
                element: elementIndex.toString(),
                siblings: siblings.map((num) => num.toString()),
                isLeft: isLeft.map((num) => num.toString()),
                nLevelsUsed: height
            });
            await circuit.checkConstraints(witness);
        });

        it("Should validate height 3 tree index 0", async function (){
            const height = 3;
            const elementIndex = 0;
            const tree = await merkleTreeHelper.buildTree(height);

            const {isLeft, siblings} = await merkleTreeHelper.genRouteAndIsLeft(tree, height, elementIndex);

            console.log("Height 3 - isLeft:", isLeft);
            console.log("Height 3 - siblings:", siblings);
            console.log("Height 3 - tree length:", tree.length);

            const witness = await circuit.calculateWitness({
                root: tree[tree.length - 1].toString(),
                element: elementIndex.toString(),
                siblings: siblings.map((num) => num.toString()),
                isLeft: isLeft.map((num) => num.toString()),
                nLevelsUsed: height
            });
            await circuit.checkConstraints(witness);
        });

        it("Should validate height 3 tree index 7", async function (){
            const height = 3;
            const elementIndex = 7;
            const tree = await merkleTreeHelper.buildTree(height);

            const {isLeft, siblings} = await merkleTreeHelper.genRouteAndIsLeft(tree, height, elementIndex);

            console.log("Height 3 - isLeft:", isLeft);
            console.log("Height 3 - siblings:", siblings);
            console.log("Height 3 - tree length:", tree.length);

            const witness = await circuit.calculateWitness({
                root: tree[tree.length - 1].toString(),
                element: elementIndex.toString(),
                siblings: siblings.map((num) => num.toString()),
                isLeft: isLeft.map((num) => num.toString()),
                nLevelsUsed: height
            });
            await circuit.checkConstraints(witness);
        });
    });
});