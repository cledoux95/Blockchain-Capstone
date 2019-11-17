var ERC721MintableComplete = artifacts.require('RealEstateERC721');

contract('TestERC721Mintable', accounts => {

    describe('match erc721 spec', function () {
        let tokenLimit = 5;
        
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accounts[0]});

            // Mint multiple tokens
            for(i = 1; i < tokenLimit; i++) {
                await this.contract.mint(accounts[i], i, {from: accounts[0]});
            }
        })

        it('should return total supply', async function () { 
            let totalTokens = await this.contract.totalSupply.call();
            
            assert.equal(totalTokens.toNumber(), tokenLimit - 1, 'Incorrect total token supply');
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf.call(accounts[1], {from: accounts[0]});

            assert.equal(tokenBalance.toNumber(), 1, 'Incorrect token balance for account');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenUriCheck = await this.contract.tokenURI.call(1, {from: accounts[0]});

            assert(tokenUriCheck == 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', 'TokenURI is invalid');
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = 1;

            await this.contract.approve(accounts[2], tokenId, {from: accounts[1]}); // (Account to be approved, Token ID)
            await this.contract.transferFrom(accounts[1], accounts[2], tokenId, {from: accounts[1]}); // (Account from, Account to, Token ID)

            let tokenOwner = await this.contract.ownerOf.call(tokenId);

            assert.equal(tokenOwner, accounts[2], 'Token has incorrect owner')
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accounts[0]});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            var eventEmitted = false;

            this.contract.Transfer((error, result) => {
                eventEmitted = true
            })

            assert.equal(eventEmitted, false, 'Minting of token by non-owner or non-approved account should fail');
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.getOwner.call({from: accounts[0]});

            assert.equal(contractOwner, accounts[0], 'Incorrect owner account');
        })
    });
})