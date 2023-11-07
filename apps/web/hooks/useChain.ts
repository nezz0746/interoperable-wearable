import { useNetwork } from "wagmi";
import { defaultChain } from "wagmi-config/wagmi";
import { localhost } from "wagmi/chains";

const useChain = () => {
  const { chain, chains } = useNetwork();

  const unsupportedChain = chain?.unsupported ?? false;

  const chainId = chain?.id ?? defaultChain.id;

  return {
    isLocal: chainId === localhost.id,
    chainId,
    unsupportedChain,
    blockExplorer: chain?.blockExplorers?.default.url,
  };
};

export default useChain;
