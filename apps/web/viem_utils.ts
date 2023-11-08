import { Chain, createWalletClient, http, publicActions } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";

const mumbaiApiKey = process.env.NEXT_PUBLIC_MUMBAI_ALCHEMY_KEY as string;

if (!mumbaiApiKey) {
  throw new Error("MUMBAI_RPC_URL is not set");
} else {
  console.log("MUMBAI_RPC_URL: ", mumbaiApiKey);
}

const mumbaiRpcUrl = `https://eth-goerli.g.alchemy.com/v2/${mumbaiApiKey}`;
const account_key = `0x${process.env.RELAYER_PRIVATE_KEY}` as `0x${string}`;
const defaultChainId = 80001;

if (!account_key) {
  throw new Error("RELAYER_PRIVATE_KEY is not set");
} else {
  console.log("RELAYER_PRIVATE_KEY: OK [...]");
}

const chains: Record<number, Chain> = {
  80001: polygonMumbai,
};

const rpcUrls: Record<number, string> = {
  80001: mumbaiRpcUrl,
};

const getClient = () => {
  const chain = chains[defaultChainId];
  const rpcUrlActual = rpcUrls[defaultChainId];

  return createWalletClient({
    account: privateKeyToAccount(account_key),
    chain,
    transport: http(rpcUrlActual),
  }).extend(publicActions);
};

export { getClient, defaultChainId };
