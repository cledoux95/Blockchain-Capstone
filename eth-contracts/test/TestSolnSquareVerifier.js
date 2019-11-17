// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let SquareVerifier = artifacts.require('SquareVerifier');
let proofFile = require('/Users/Narnia/Desktop/UdacityBlockchainTerm2/Blockchain-Capstone/zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {

    describe('test solnSquareVerifier with proof', function () {
        beforeEach(async function () {
            const _SquareVerifier = await SquareVerifier.new({from: accounts[0]});
            this.contract = await SolnSquareVerifier.new(_SquareVerifier.address, {from: accounts[0]});
        })

        it('if a new solution can be added for contract and token minted - SolnSquareVerifier', async function () { 
            let success = true;

            try {
                await this.contract.mintToken(accounts[1], 2, proofFile.proof.a, proofFile.proof.b, proofFile.proof.c, proofFile.inputs, {from: accounts[0]});
            } catch(error) {
                success = false;
            }

            assert.equal(success, true, 'Solution could not be added')
        })

        it('if a repeat solution can be added for contract - SolnSquareVerifier', async function () { 
            let success = true;

            await this.contract.mintToken(accounts[1], 2, proofFile.proof.a, proofFile.proof.b, proofFile.proof.c, proofFile.inputs, {from: accounts[0]});


            try {
                await this.contract.mintToken(accounts[1], 3, proofFile.proof.a, proofFile.proof.b, proofFile.proof.c, proofFile.inputs, {from: accounts[0]});
            } catch(error) {
                success = false;
            }

            assert.equal(success, false, 'Repeat solution was added')
        })
    })
})

