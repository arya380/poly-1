const hardhat = require("hardhat");
const { FXRootContractAbi } = require("../abis");

async function main() {
  // Replace with the contract address of your AbstractArt NFT
  const nftAddress = "0x23a8f000f368e9c277c6C2cE48c5043585b4886b";

  // Replace with the address where you want to deposit the NFTs
  const accountAddress = "0x0A0299Bca77A1E47BDED9bD20250eA370783f542";

  // Replace with the token IDs you want to deposit
  const tokenIds = [1, 2, 3, 4, 5];

  // Step 1: Get the contract instances
  const nftCollection = await hardhat.ethers.getContractAt(
    "Cowboy",
    nftAddress
  );
  const fxRoot = await hardhat.ethers.getContractAt(
    FXRootContractAbi,
    "0xF9bc4a80464E48369303196645e876c8C7D972de"
  );

  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];

    // Step 2: Approve the transfer of the token to fxRoot contract
    const approveTxn = await nftCollection.approve(fxRoot.address, tokenId, {
      gasLimit: 300000,
    });
    await approveTxn.wait();
    console.log(`👍 NFT ${tokenId} approved`);

    // Step 3: Deposit the token into fxRoot contract
    const depositTxn = await fxRoot.deposit(
      nftAddress,
      accountAddress,
      tokenId,
      "0x6566",
      { gasLimit: 300000 }
    );
    await depositTxn.wait();
    console.log(`✅ NFT ${tokenId} deposited`);
  }
}

main().catch((error) => {
  console.error(`❌ Error: ${error}`);
  process.exitCode = 1;
});
