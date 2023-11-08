import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig } from "wagmi";
import { base, goerli, localhost, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import {
  projectId,
  appName,
  localChainEnabled,
  testnetChainEnabled,
  mainnetChainEnabled,
  goerliApiKey,
  mumbaiApiKey,
} from "shared-config";

let defaultChain: Chain;
let appChains: Chain[] = [];

if (localChainEnabled) {
  defaultChain = localhost;
  appChains = [localhost];
}

if (testnetChainEnabled) {
  defaultChain = goerli;
  appChains = [goerli, polygonMumbai];
}

if (mainnetChainEnabled) {
  defaultChain = base;
  appChains = [base];
}

const { chains, publicClient } = configureChains(appChains, [
  alchemyProvider({ apiKey: goerliApiKey }),
  alchemyProvider({ apiKey: mumbaiApiKey }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName,
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains, defaultChain };
