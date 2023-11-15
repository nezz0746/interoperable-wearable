import { Chain, createPublicClient, http } from "viem";
import {
  polygonMumbai,
  mainnet,
  polygon,
  optimism,
  base,
  baseGoerli,
  goerli,
  optimismGoerli,
} from "viem/chains";
import { alchemy_key } from "./variables";

export const chainIdToChain: Record<number, Chain> = {
  1: mainnet,
  137: polygon,
  10: optimism,
  420: optimismGoerli,
  5: goerli,
  8453: base,
  84531: baseGoerli,
  80001: polygonMumbai,
};

export const chainIdToRpcUrl: Record<number, string> = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${alchemy_key}`,
  5: `https://eth-goerli.g.alchemy.com/v2/${alchemy_key}`,
  11155111: `https://eth-sepolia.g.alchemy.com/v2/${alchemy_key}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${alchemy_key}`,
  420: `https://opt-goerli.g.alchemy.com/v2/${alchemy_key}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${alchemy_key}`,
  80001: `https://polygon-mumbai.g.alchemy.com/v2/${alchemy_key}`,
};

export const chainIdToEtherscanUrl: Record<number, string> = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
  11155111: "https://sepolia.etherscan.io",
  10: "https://optimistic.etherscan.io",
  420: "https://goerli-optimism.etherscan.io",
  137: "https://polygonscan.com",
  80001: "https://mumbai.polygonscan.com",
};

export const getPublicClient = (chainId: number) => {
  const rpc_url = chainIdToRpcUrl[chainId];

  const chain = chainIdToChain[chainId];

  return createPublicClient({
    chain,
    transport: http(rpc_url),
  });
};
