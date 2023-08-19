const { ethers } = require("hardhat");
require("dotenv").config();

async function mintNFTs() {
  // Replace with the contract address of your Cowboy NFT
  const nftAddress = "0x0A0299Bca77A1E47BDED9bD20250eA370783f542";

  // Get the contract instance
  const contract = await ethers.getContractAt("Cowboy", nftAddress);

  // Replace with the address where you want to mint the NFTs
  const accountAddress = "0xD568E4D22e269f1E6594E7805dddBb2Cc8274dB7";

  // Metadata URIs for each NFT
  const metadataURIs = [
    "https://gateway.pinata.cloud/ipfs/QmaSvEAt5YkzGiX9XfeQDNKxSFVxWzPwzjfPXgpDWuXrLQ/1.json",
    "https://gateway.pinata.cloud/ipfs/QmaSvEAt5YkzGiX9XfeQDNKxSFVxWzPwzjfPXgpDWuXrLQ/2.json",
    "https://gateway.pinata.cloud/ipfs/QmaSvEAt5YkzGiX9XfeQDNKxSFVxWzPwzjfPXgpDWuXrLQ/3.json",
    "https://gateway.pinata.cloud/ipfs/QmaSvEAt5YkzGiX9XfeQDNKxSFVxWzPwzjfPXgpDWuXrLQ/4.json",
    "https://gateway.pinata.cloud/ipfs/QmaSvEAt5YkzGiX9XfeQDNKxSFVxWzPwzjfPXgpDWuXrLQ/5.json",
  ];

  const numNFTs = 5; // Number of NFTs to mint

  console.log("=== Starting NFT Minting Process ===");

  for (let i = 0; i < numNFTs; i++) {
    const metadataURI = metadataURIs[i];
    console.log(`Minting NFT #${i + 1} with metadata URI: ${metadataURI}`);

    try {
      // Call the contract's mint function
      const transaction = await contract.mint(accountAddress, metadataURI);
      await transaction.wait();

      console.log(`✓ NFT #${i + 1} successfully minted!`);
    } catch (error) {
      console.error(`❌ Error minting NFT #${i + 1}:`, error.message);
    }
  }

  console.log("=== Minting process complete! ===");
}

mintNFTs()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error in mintNFTs function:", error.message);
    process.exit(1);
  });
