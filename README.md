# Udacity Blockchain Capstone - Real Estate

This capstone project for the Udacity ND1309 Course is to create an ERC721 representation of real estate and allow for these unique tokenized assets to be bought and sold on moarketplaces (such as OpenSea).

Several techniques are used to ensure security, reliability, and transferrability.
Firstly, to mint tokens, one must generate a pre-knowledge proof (using zokrates, zk-SNARKs) where you show that you indeed own the property, then once minted you can transfer them on a marketplace.

The tokens minted in this project are available here:
https://rinkeby.opensea.io/assets/real-estate-tokenization-2?

To access the live contract as deployed on the Rinkeby network:

SquareVerifier:
Transaction Hash:
`0x5683b90c6051a2e5cec1d19971d9f316cf32a3f5c7f2f5df8858b0fa5cdacfa9`
Contract Address:
`0x08Db9350f432CF6fF3C956eB28FB50b17ce71f0D`


SolnSquareVerifier:
Transaction Hash:
`0x5ed22920afbde23e3cd2b53b5090d7bde753f4c3be4deeca88e4227958532372`
Contract Address:
`0x5e9559A18282D6254bB1AcFD54Eb3582535D45d4`

ABIs are available upon inspection of the JSON files in ./eth-contracts/build/contracts/.

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/cledoux95/Blockchain-Capstone
```

```
cd Blockchain-Capstone
npm install
```

Launch Ganache:

```
ganache-cli -m "still face what nephew mercy attitude gravity sugar end spoil lawn snap"
```

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

All 10 tests should pass.

In a separate terminal window, launch the DApp:

```
npm run dev
```

### Migrating to Rinkeby

Migrate smart contracts to rinkeby blockchain:

```
truffle migrate --reset --network rinkeby --compile-all
```

# Generating a zocrates proof

1. Install Docker (Docker for Desktop is fine too)
2. run: ```docker run -v <your repo location>/Blockchain-Capstone/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash```
3. ```cd square```
4. Compile with ```~/zokrates compile -i square.code```
5. Run zocrates setup ```~/zokrates setup```
6. Compute a witness ```~/zokrates compute-witness -a 3 9```
7. Generate the proof ```~/zokrates generate-proof```
8. Export the verifier contract ```~/zokrates export-verifier```

Congrats, you've done something most people have no idea how to do.

### Minting your first tokens

In a separate terminal window run:

```
npm run dapp
```

Then navigate to:

http://localhost:3000


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
