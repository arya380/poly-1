# cowboy - ERC721 NFT Contract

This project provides a simple ERC-721 compliant smart contract to create and manage non-fungible tokens (NFTs) on the Polygon blockchain. Users can generate new NFTs, set their metadata (URI), and check the overall supply and balance of NFTs.

## Getting Started



### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install the necessary dependencies:

```bash
npm install
```

## Deployment

Before deploying the ERC721 contract, provide your wallet private key where required, i.e., `PRIVATE_KEY= 'your wallet private key'`. To deploy the ERC721 contract named "AnimePiece" to the Goerli Ethereum Testnet, run the following command:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

_Note: After deploying, copy the generated address into `contractAddress.js` (stored in the metadata folder) and `batchMint.js` (stored in the scripts folder)._

## Batch Mint NFTs

This command will mint the NFTs:

```bash
npx hardhat run scripts/Mint.js --network goerli
```

## Approve and Deposit NFTs to Polygon Mumbai

This command will use the FxPortal Bridge to approve and deposit the minted NFTs from Ethereum to the Polygon Mumbai network.

```bash
npx hardhat run scripts/Transfer.js --goerli
```




## License

This project is licensed under the MIT License. You can make a copy of the project to use for your own purposes.
