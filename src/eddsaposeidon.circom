pragma circom 2.0.0;
include "../node_modules/circomlib/circuits/eddsaposeidon.circom";
include "../node_modules/circomlib/circuits/poseidon.circom";

template erc20TranscationSignature() {
    signal input sender[2];
    signal input receiver[2];
    signal input amount;
    signal input signatureR[2];
    signal input signatureS;
    signal output value;

    component hasher = Poseidon(5);
    hasher.inputs[0] <== sender[0];
    hasher.inputs[1] <== sender[1];
    hasher.inputs[2] <== receiver[0];
    hasher.inputs[3] <== receiver[1];
    hasher.inputs[4] <== amount;

    value <== hasher.out;
    log(hasher.out);

    component signatureVerifier = EdDSAPoseidonVerifier();
    signatureVerifier.enabled <== 1;
    signatureVerifier.Ax <== sender[0];
    signatureVerifier.Ay <== sender[1];
    signatureVerifier.R8x <== signatureR[0];
    signatureVerifier.R8y <== signatureR[1];
    signatureVerifier.S <== signatureS;
    signatureVerifier.M <== hasher.out;

    
}   

component main = erc20TranscationSignature();