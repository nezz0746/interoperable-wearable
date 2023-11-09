import { ItemMetadata, fetchMetadata } from "utils";
import useAppAddresses from "./useAppAddresses";
import { useEffect } from "react";
import { useInteropAccountDropUri } from "wagmi-config/generated";
import useChain from "./useChain";
import { create } from "zustand";

export const useAccountNftStore = create<{
  metadata: ItemMetadata | undefined;
  setMetadata: (metadata: ItemMetadata) => void;
}>((set) => ({
  metadata: undefined,
  setMetadata: (metadata) => set({ metadata }),
}));

const useAccountNft = () => {
  const { mainChainId } = useChain();
  const { accountContractAddress } = useAppAddresses();
  const { metadata, setMetadata } = useAccountNftStore();
  const { data: uri } = useInteropAccountDropUri({
    chainId: mainChainId,
  });

  const fetchAccountMetadata = async (ipfsUri: string) => {
    const data = await fetchMetadata(ipfsUri.split("//")[1]);

    setMetadata({
      ...data,
      image: `https://ipfs.io/ipfs/${data.image.split("//")[1]}`,
      contractAddress: accountContractAddress,
      chainId: mainChainId,
    });
  };

  useEffect(() => {
    console.log(uri);
    if (uri) {
      fetchAccountMetadata(uri);
    }
  }, [uri]);

  return {
    metadata,
  };
};

export default useAccountNft;
