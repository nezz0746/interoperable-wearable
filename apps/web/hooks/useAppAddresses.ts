import { interopAccountAddress, interopAccountRelayAddress } from "utils";
import useChain from "./useChain";

const useAppAddresses = () => {
  const { mainChainId, relayChainId } = useChain();
  const accountContractAddress = interopAccountAddress[mainChainId];
  const accountRelayContractAddress = interopAccountRelayAddress[relayChainId];

  return {
    accountContractAddress,
    accountRelayContractAddress,
  };
};

export default useAppAddresses;
