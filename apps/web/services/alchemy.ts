import { Alchemy, NftNamespace, Network } from "alchemy-sdk";
import { goerliApiKey, mumbaiApiKey } from "shared-config";

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
  5: goerliNft,
};

export default nft;
