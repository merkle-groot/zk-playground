pragma circom 2.0.4;

include "../node_modules/circomlib/circuits/comparators.circom";

template Greatest(n) {
    signal input numbers[n];
    signal intermediate[n];
    signal output greatest;

    component greatestTwo[n];
    intermediate[0] <== numbers[0];


    for(var i=1; i<n; i++){
        greatestTwo[i] = GreaterEqThan(252);
        greatestTwo[i].in[0] <== intermediate[i-1];
        greatestTwo[i].in[1] <== numbers[i];

        intermediate[i] <== (intermediate[i-1] - numbers[i]) * greatestTwo[i].out + numbers[i]; 
        log(intermediate[i]);
    }

    greatest <== intermediate[n-1];
}