import { Chain } from "viem";
import { goerli, polygonMumbai } from "viem/chains";

export const interopAccountChainId: 5 = 5;
export const interopAccoutRelayChainId: 80001 = 80001;

export const chains: Record<number, Chain> = {
  80001: polygonMumbai,
  5: goerli,
};
