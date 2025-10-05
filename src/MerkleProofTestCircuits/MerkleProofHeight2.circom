pragma circom 2.0.4;

include "../MerkleProof.circom";
component main{public [root, element, nLevelsUsed]} = MerkleVerifier(2);
