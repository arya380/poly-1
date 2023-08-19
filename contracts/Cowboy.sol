// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Cowboy is ERC721Enumerable, Ownable {
    // Maximum capacity of tokens that can be minted 
    uint256 public constant maxQuantity = 5;
    
    uint256 private totalMinted; 
   
     // Base url for the nfts
    string private baseUrl = "https://gateway.pinata.cloud/ipfs/QmSan3wsM3ukphHP2Q1VMXBrQuicAKkx7GyD6YvAwo6uKY/";

     // URL for the prompt description
    string public promptDescription = "create NFT of cowboy in environment ";

    mapping(address => uint256) private tokensMinted;
    mapping(uint256 => string) private tokenAttributes;
    mapping(uint256 => string) private tokenUrls;

    event NFTMinted(address indexed minter, uint256 tokenId);

    constructor() ERC721("CowBoy", "CB") {
      
    }


    function mint(address to, string calldata nftUrl) external payable {
        require(totalMinted < maxQuantity, "overlimit ");

        totalMinted++;
        uint256 tokenId = totalMinted;
        tokensMinted[to]++;
        _mint(to, tokenId);
        tokenAttributes[tokenId] = ""; // Set empty attributes for now
        tokenUrls[tokenId] = nftUrl;   // Set the URL for the NFT
        emit NFTMinted(to, tokenId);
    }

    function setBaseURI(string memory newBaseUrl) external onlyOwner {
        baseUrl = newBaseUrl;
    }

    function updatePromptDescription(string memory newDescription) external onlyOwner {
        promptDescription = newDescription;
    }


    function getTokenUrl(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Invalid tokenId");
        return tokenUrls[tokenId];
    }

    function totalSupply() public view override returns (uint256) {
        return totalMinted;
    }

}
