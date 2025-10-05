const { buildPoseidon } = require('circomlibjs');

// Initialize Poseidon hash function (arity 2 for two inputs)
let poseidon;

async function initializePoseidon() {
    poseidon = await buildPoseidon();
}

// Hash two field elements (like your Rust example)
async function hash(input1, input2) {
    if (!poseidon) {
        await initializePoseidon();
    }
    const bytesResult =  poseidon([input1, input2]);
    const bigIntHash = poseidon.F.toObject(bytesResult);
    return bigIntHash;
}

async function buildTree(height) {
    let tree = [];
    let tree_leaves = Math.pow(2, height);
    let total_nodes = 2 * tree_leaves - 1;

    for(let i=0; i<tree_leaves; ++i){
        tree.push(i);
    }

    for(let i = 0; i< total_nodes - 1; ++i){
        if(i % 2 == 1){
            tree.push(await hash(tree[i-1], tree[i]));
        }
    }
    return tree;
}

async function genRouteAndIsLeft(tree, height, index){
    let isLeft = [];
    let siblings = [];
    let tree_leaves = Math.pow(2, height);
    let level = height;

    while(level !=0){
        if(index % 2 == 1){
            isLeft.push(0);
            siblings.push(tree[index - 1]);
        } else {
            isLeft.push(1);
            siblings.push(tree[index + 1]);
        }   
        
        console.log("index: ", index);
        index = Math.floor(index/ 2) + tree_leaves;
        level --;
    }

    siblings.reverse();
    isLeft.reverse();
    return {
        isLeft,
        siblings
    }
}

function getChildren(height, index) {
    let level = height;
    let lastLevelNodes = 0;
    let noOfNodes = 0;

    while(1){
        console.log("level: ", level);
        noOfNodesLevel = 2**level;

        if(index < noOfNodes + noOfNodesLevel){
            break;
        }

        noOfNodes += noOfNodesLevel;
        level--;
        lastLevelNodes = noOfNodesLevel;
    }

    console.log("noOfNodes: ", noOfNodes);
    console.log("lastLevelNodes: ", lastLevelNodes);
    console.log(index - noOfNodes - lastLevelNodes);
}

// // Example usage
// async function main() {
//     const height = 3;
//     const tree = await buildTree(height);

//     console.log("Merkle tree:", tree);
//     const siblingPath = await genRouteAndIsLeft(tree, height, 4);
//     console.log("Sibling path:", siblingPath);


//     // getChildren(3, 4);
// }

// main().catch(console.error);

module.exports = {
    buildTree,
    genRouteAndIsLeft
};