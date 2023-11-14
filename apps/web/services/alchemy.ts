import { Alchemy, NftNamespace, Network } from "alchemy-sdk";
import { goerliApiKey, mumbaiApiKey } from "shared-config";

const polygonNft = new Alchemy({
  apiKey: mumbaiApiKey,
  network: Network.MATIC_MUMBAI,
}).nft;

const mainnetNft = new Alchemy({
  apiKey: goerliApiKey,
  network: Network.ETH_GOERLI,
}).nft;

const mumbaiNft = new Alchemy({
  apiKey: mumbaiApiKey,
  network: Network.MATIC_MUMBAI,
}).nft;

const goerliNft = new Alchemy({
  apiKey: goerliApiKey,
  network: Network.ETH_GOERLI,
}).nft;

const nft: Record<number, NftNamespace> = {
  80001: mumbaiNft,
  137: polygonNft,
  5: goerliNft,
  1: mainnetNft,
};

export default nft;
