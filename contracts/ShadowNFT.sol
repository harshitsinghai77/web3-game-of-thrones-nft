// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract ShadowNFT is ERC721URIStorage {
    // Using OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewNFTMinted(address sender, uint256 tokenId);

    // We need to pass the name of our NFTs token and it's symbol.
    constructor() ERC721("ShadowNFT", "SNFT") {
        console.log("This is my NFT Contract. Yeah!!");
    }

    // A function our user will hit to get their NFT.
    function makeAnEpicNFT(string memory metadata) public {
        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);
        // Set the NFTs data
        _setTokenURI(newItemId, metadata);
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        emit NewNFTMinted(msg.sender, newItemId);
    }
}
