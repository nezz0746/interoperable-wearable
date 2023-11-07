import { useNetwork } from "wagmi";
import { defaultChain } from "wagmi-config/wagmi";
import { localhost } from "wagmi/chains";

const useChain = () => {
  const { chain, chains } = useNetwork();

  const unsupportedChain = !chains?.find((c) => c.id === chain?.id);

  const chainId = chain?.id ?? defaultChain.id;

  return {
    isLocal: chainId === localhost.id,
    chainId,
    unsupportedChain,
  };
};

export default useChain;
