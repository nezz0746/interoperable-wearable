import { defaultChainId, getClient } from "../viem_utils";
import {
  interopAccountRelayABI,
  interopAccountRelayAddress,
} from "wagmi-config/generated";

type AccountCreationArgs = {
  chainId: bigint;
  tokenContract: `0x${string}`;
  tokenId: bigint;
};

export const createAccountOnSidechain = async ({
  chainId: interopNftChainId,
  tokenContract,
  tokenId,
}: AccountCreationArgs) => {
  const client = getClient();

  const accountAccountRelayAddress = interopAccountRelayAddress[defaultChainId];

  const { request } = await client.simulateContract({
    args: [interopNftChainId, tokenContract, tokenId],
    chain: client.chain,
    account: client.account,
    abi: interopAccountRelayABI,
    functionName: "createAccount",
    address: accountAccountRelayAddress,
    type: "eip1559",
  });

  return await client.writeContract(request);
};
