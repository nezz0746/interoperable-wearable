# Interoperable Wearable Standard

Overview:

<!-- TODO: Add project Diagram -->

This project uses
- [foundry](https://github.com/foundry-rs/foundry) to implement & deploy smart contracts
- [tenderly](https://tenderly.co/) to trigger cross chain account creation
- nextjs for the mint page & vercel to deployment

## Install

```bash
# from root
yarn

# from app/contracts
forge install
```
Note: if neede here's how to [install foundry](https://getfoundry.sh/)

## Deploy Procedure

Quick Look:
- Prepare metatdata in items-metadata package by running script & save metadata cids
in `items-metadata.json`.
- Prepare script with correct items to be delivered & appropriate name symbol & uri in `app/contracts/scrips/DeployIWS.sol`
- Deploy smart contracts & generate wagmi hooks by running: `deploy:testnets`
- Push Code to deploy on vercel (or any provider), so that relay endpoint is up for the actions to be relayed. (Set enpoint base URI in Tenerly if not done)
- Add InteropAccount contract address in Teenderly project (Could see if can add programatically)
- Deploy actions by running: `deploy:actions:testnets`

Steps to deploy the Interop NFT bound accounts

### 1. Deploy InteropAccount & InteropAccountRelay

Prerequisite:
- instal foudndry
- run `forge install` in `apps/contracts`

```bash
yarn run deploy:testnets
```

⚠️ Required Environment variables: check `apps/contracts/.env.example`
```bash
# ALCHEMY
ALCHEMY_GOERLI_API_KEY=
ALCHEMY_MUMBAI_API_KEY=

# ETHERSCAN
API_KEY_ETHERSCAN=
API_KEY_POLYGONSCAN=

TESTNET_PK=
```


### 2. Deploy the web3 action

```bash
# From the root of the project run the following scirpt:
yarn run deploy:actions:testnet
```

⚠️ Required Environment variables: 
- in tenderly "Storage" (though the dashboard UI): `apiBaseURL` which is the url of the deployed nextjs app.
<img src="TenderlyStorage.png">
- Add InteropAccountRelay as Contract in your tenderly project

### 3. Deploy frontend

Required Environment variables: check `apps/web/.env.example`
```bash
NEXT_PUBLIC_TESTNET_CHAINS_ENABLED=true
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

NEXT_PUBLIC_MUMBAI_ALCHEMY_KEY=
NEXT_PUBLIC_GOERLI_ALCHEMY_KEY=

RELAYER_PRIVATE_KEY=
```

Deploy nextjs app on vercel

This scripts feeds the deployed artifact InteropAccountNFT's address into the .yaml config & deploy the action to tenderly. You need to install the tenderly-cli & run `tenderly login` first


### 4. Assets & Metadata Needed