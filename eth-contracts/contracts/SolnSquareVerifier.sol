pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./Verifier.sol";
import "./ERC721Mintable.sol";

// Define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {

}

// Define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is  RealEstateERC721 {
    SquareVerifier public verifierContract;

    constructor(address verifierAddress)
          RealEstateERC721()
          public
          {
              verifierContract = SquareVerifier(verifierAddress);
          }

    // Define a solutions struct that can hold an index & an address
    struct Solutions {
        uint256 tokenId;
        address to;
    }

    // Define an array of the above struct
    Solutions[] solutions;

    // Define a mapping to store unique solutions submitted
    mapping(bytes32 => Solutions) private uniqueSolutions;

    // Create an event to emit when a solution is added
    event AddedSolution(uint256 tokenId, address to);

    // Create a function to add the solutions to the array and emit the event
    function addSolution(
                            address _to,
                            uint256 _tokenId,
                            bytes32 key
                        )
                        public
    {
        Solutions memory solution = Solutions({tokenId: _tokenId, to: _to});
        solutions.push(solution);
        uniqueSolutions[key] = solution;

        emit AddedSolution(_tokenId, _to);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintToken(
                        address _to,
                        uint256 _tokenId,
                        uint[2] memory a,
                        uint[2][2] memory b,
                        uint[2] memory c,
                        uint[2] memory input
                    )
                    public
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].to == address(0), 'Solution has already been used');
        require(verifierContract.verifyTx(a, b, c, input), 'Solution is invalid');

        addSolution(_to, _tokenId, key);
        super.mint(_to, _tokenId);
    }

}