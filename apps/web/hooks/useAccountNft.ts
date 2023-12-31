import useAppAddresses from "./useAppAddresses";
import useChain from "./useChain";

const useAccountNft = () => {
  const { mainChainId } = useChain();
  const { accountContractAddress } = useAppAddresses();

  return {
    metadata: {
      name: "Gaian Wearable Pack",
      description: "",
      blockExplorerLink: "",
      image: `/main.png`,
      contractAddress: accountContractAddress,
      chainId: mainChainId,
    },
  };
};

export default useAccountNft;
