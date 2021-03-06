// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates

let SquareVerifier = artifacts.require('SquareVerifier');
let proofFile = require('/Users/Narnia/Desktop/UdacityBlockchainTerm2/Blockchain-Capstone/zokrates/code/square/proof.json');

contract('TestQuareVerifier', accounts => {

    describe('test verifier with proof', function () {
        beforeEach(async function () {
            this.contract = await SquareVerifier.new({from: accounts[0]});
        })

        it('verify with correct proof', async function () { 
            let verification = await this.contract.verifyTx.call(proofFile.proof.a, proofFile.proof.b, proofFile.proof.c, proofFile.inputs, {from: accounts[0]});

            assert.equal(verification, true, 'Verification is invalid');
        })

        it('verify failure with incorrect proof', async function () { 
            let verification = await this.contract.verifyTx.call(proofFile.proof.a, proofFile.proof.b, proofFile.proof.c, [5,4], {from: accounts[0]});

            assert.equal(verification, false, 'Verification is valid');
        })

    })
});

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
