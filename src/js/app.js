App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        // App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
            console.log(App.web3Provider);
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initMintToken();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initMintToken: function () {
        /// Source the truffle compiled smart contracts
        var jsonVerifier='../../eth-contracts/build/contracts/SolnSquareVerifier.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonVerifier, function(data) {
            console.log('data',data);
            var verifierArtifact = data;
            App.contracts.SolnSquareVerifier = TruffleContract(verifierArtifact);
            App.contracts.SolnSquareVerifier.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.mintToken(event);
                break;
            case 2:
                break;
            }
    },

    mintToken: function(event) {
        event.preventDefault();
        App.propertyNumber = $("#propertyNumber").val();

        console.log(`Property ${App.propertyNumber}`)
        App.contracts.SolnSquareVerifier.deployed().then(function(instance) {
                return instance.mint( 
                    App.metamaskAccountID, 
                    App.propertyNumber, 
                    // proofFile.proof.a,
                    // proofFile.proof.b,
                    // proofFile.proof.c,
                    // proofFile.inputs,
                    {from: App.metamaskAccountID, gas: 2500000}
                );

        // Enable to use Zokrates Proofs
        // App.contracts.SolnSquareVerifier.deployed().then(function(instance) {
        //     return instance.mintToken( 
        //         App.metamaskAccountID, 
        //         App.propertyNumber, 
        //         proofFile.proof.a,
        //         proofFile.proof.b,
        //         proofFile.proof.c,
        //         proofFile.inputs,
        //         {from: App.metamaskAccountID, gas: 2500000}
        //     );
        }).then(function(result) {
            $("#ftc-item").text(result.tx);
            console.log('mintToken',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    }
};

let proofFile = {
    "proof": {
        "a": ["0x25f09cb9581fb3f0c7a9c73d8475ad7b6d739073ee2e51a0762d2a793da6e0c8", "0x2dc65fc92ff214cc60be609b1070134eea1ea5f790c323cf86e2a129a4d99e86"],
        "b": [["0x09fdee16c153acad4e3e7b65375e3ea09d5b6fea8cd927786a3ae08c6f6e7726", "0x057ada10c4f9f25a97fdd517053cab5ab84dd3fe5c6536359a5bc1b2e684d426"], ["0x221affda760531ec160734ad0bf039f1467b06a353c08a2ce49051601d2823d5", "0x1186a441c8223cb7bcc954e8e2b408bfc228543bfb58536c37824c24d1356849"]],
        "c": ["0x09485fda64d683e3e83e89e0a91d80ac5d808c62fae4195567d297a5a71a83aa", "0x2738e01dbd0296a0e46db9e91d2f63ef9032afd1fca551d5d4bb5dd245f85450"]
    },
    "inputs": [3, 9]
}

$(function () {
    $(window).load(function () {
        App.init();
    });
});
