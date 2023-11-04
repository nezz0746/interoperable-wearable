import { Alchemy, NftNamespace, Network } from "alchemy-sdk";

const mumbaiApiKey = process.env.NEXT_PUBLIC_MUMBAI_ALCHEMY_KEY;
const goerliApiKey = process.env.NEXT_PUBLIC_GOERLI_ALCHEMY_KEY;

if (!mumbaiApiKey || !goerliApiKey) {
  throw new Error("Missing Alchemy API key");
}

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
