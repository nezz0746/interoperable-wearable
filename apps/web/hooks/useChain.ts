import {
  interopAccountChainId,
  interopAccoutRelayChainId,
} from "services/constants";
import { useNetwork } from "wagmi";
import { defaultChain } from "wagmi-config/wagmi";
import { localhost } from "wagmi/chains";

const useChain = () => {
  const mainChainId = interopAccountChainId;

  const relayChainId = interopAccoutRelayChainId;

  const { chain, chains } = useNetwork();

  const unsupportedChain = chain?.unsupported ?? false;

  const currentChainId = chain?.id ?? defaultChain.id;

  const isPolygon = (chainId: number) => {
    return chainId === 137 || chainId === 80001;
  };

  const isMainnet = (chainId: number) => {
    return chainId === 1 || chainId === 5;
  };

  return {
    chains,
    isMainnet,
    isPolygon,
    isLocal: currentChainId === localhost.id,
    currentChainId,
    mainChainId,
    relayChainId,
    unsupportedChain,
    blockExplorer: chain?.blockExplorers?.default.url,
  };
};

export default useChain;
