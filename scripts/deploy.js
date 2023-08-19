const hre = require("hardhat");
const fs = require('fs');

async function main() {
  //1. Get the contract factory for Cowboy
  const Cowboy = await hre.ethers.getContractFactory("Cowboy");

  //2. Deploy the contract
  const nft = await Cowboy.deploy();

  //3. Wait for the contract to be deployed
  await nft.deployed();

  //4. Log the contract address after deployment
  console.log("Cowboy contract has been deployed at address:", nft.address);

  //5. Export the contract address to a file for future reference
  fs.writeFileSync('metadata/contractAddress.js', `
    export const nftAddress = "${nft.address}"
  `);
}

// Execute the deployment function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Not able to run Cowboy contract:", error);
    process.exit(1);
});
