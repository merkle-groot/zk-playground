pragma circom 2.0.4;
include "../node_modules/circomlib/circuits/poseidon.circom";
include "../node_modules/circomlib/circuits/comparators.circom";

template wordle() {
    signal input solution[5];
    signal input guess[5];
    signal sum[5];
    signal output eval[5];

    // bulls
    component comparisonResultExact[5];
    // cows
    component comparisonResultMatch[25];
    component zeroCheck[5];

    // Init all the components outside the loop
    for(var i=0; i<5; i++){
        comparisonResultExact[i] = IsEqual();
        zeroCheck[i] = IsZero();
    }

    for(var i=0; i<25; i++){
        comparisonResultMatch[i] = IsEqual();
    }

    for(var i=0; i<5; i++){
        var startIndex = i*5;
        comparisonResultExact[i].in[0] <== guess[i];
        comparisonResultExact[i].in[1] <== solution[i];
        for(var j=0; j<5; j++){
            comparisonResultMatch[startIndex + j].in[0] <== guess[i];
            comparisonResultMatch[startIndex + j].in[1] <== solution[j];
        }

        sum[i] <== comparisonResultMatch[startIndex].out + comparisonResultMatch[startIndex + 1].out + comparisonResultMatch[startIndex + 2].out + comparisonResultMatch[startIndex + 3].out + comparisonResultMatch[startIndex + 4].out;
        zeroCheck[i].in <== sum[i];
        
        eval[i] <== comparisonResultExact[i].out + (1 - zeroCheck[i].out);

        log(100);
        log(sum[i]);
        log(comparisonResultExact[i].out);
        log(100);
    }
}

component main{public [guess]} = wordle();