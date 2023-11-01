import { useNetwork } from "wagmi";
import { defaultChain } from "wagmi-config/wagmi";
import { localhost } from "wagmi/chains";

const useChain = () => {
  const { chain } = useNetwork();

  const chainId = chain?.id ?? defaultChain;

  return {
    isLocal: chainId === localhost.id,
    chainId,
  };
};

export default useChain;
