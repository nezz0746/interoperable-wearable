import { Chain, createWalletClient, http, publicActions } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";

const account_key = `0x${process.env.RELAYER_PRIVATE_KEY}` as `0x${string}`;
const mumbaiRpcUrl = process.env.MUMBAI_RPC_URL as string;
const defaultChainId = 80001;

if (!account_key) {
  throw new Error("RELAYER_PRIVATE_KEY is not set");
} else {
  console.log("RELAYER_PRIVATE_KEY: OK [...]");
}

if (!mumbaiRpcUrl) {
  throw new Error("MUMBAI_RPC_URL is not set");
} else {
  console.log("MUMBAI_RPC_URL: ", mumbaiRpcUrl);
}

const chains: Record<number, Chain> = {
  80001: polygonMumbai,
};

const rpcUrls: Record<number, string> = {
  80001: mumbaiRpcUrl,
};

const getClient = (rpcUrl: string, chainId: number) => {
  const chain = chains[chainId ?? defaultChainId];
  const rpcUrlActual = rpcUrls[chainId ?? defaultChainId];

  return createWalletClient({
    account: privateKeyToAccount(account_key),
    chain,
    transport: http(rpcUrlActual),
  }).extend(publicActions);
};

export { getClient, defaultChainId };
