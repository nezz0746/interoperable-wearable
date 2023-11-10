import { createWalletClient, http, publicActions } from "viem";

import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { chains } from "./services/constants";

const mumbaiApiKey = process.env.MUMBAI_ALCHEMY_KEY as string;

if (!mumbaiApiKey) {
  throw new Error("MUMBAI_ALCHEMY_KEY is not set");
} else {
  console.log("MUMBAI_ALCHEMY_KEY: ", mumbaiApiKey);
}

const mumbaiRpcUrl = `${polygonMumbai.rpcUrls.alchemy.http}/${mumbaiApiKey}`;
const account_key = `0x${process.env.RELAYER_PRIVATE_KEY}` as `0x${string}`;
const defaultChainId = 80001;

if (!account_key) {
  throw new Error("RELAYER_PRIVATE_KEY is not set");
} else {
  console.log("RELAYER_PRIVATE_KEY: OK [...]");
}

const rpcUrls: Record<number, string> = {
  80001: mumbaiRpcUrl,
};

const getClient = () => {
  const chain = chains[defaultChainId];
  const rpcUrlActual = rpcUrls[defaultChainId];

  console.log("CLIENT: ", {
    chain,
    rpcUrlActual,
  });

  return createWalletClient({
    account: privateKeyToAccount(account_key),
    chain,
    transport: http(rpcUrlActual),
  }).extend(publicActions);
};

export { getClient, defaultChainId };
