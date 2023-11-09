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

const gasSnapshot = {
  delivery: 85000,
  accountCreation: 130000,
};

export const createAccountOnSidechain = async ({
  chainId: interopNftChainId,
  tokenContract,
  tokenId,
}: AccountCreationArgs) => {
  const client = getClient();

  const accountAccountRelayAddress = interopAccountRelayAddress[defaultChainId];

  const numberOfDeliverables = (
    await client.readContract({
      abi: interopAccountRelayABI,
      address: accountAccountRelayAddress,
      functionName: "getItems",
    })
  ).length;

  let gas = BigInt(
    (
      (gasSnapshot.delivery * numberOfDeliverables +
        gasSnapshot.accountCreation) *
      1.2
    ).toFixed(0)
  );

  const { request } = await client.simulateContract({
    args: [interopNftChainId, tokenContract, tokenId],
    chain: client.chain,
    account: client.account,
    abi: interopAccountRelayABI,
    functionName: "createAccount",
    address: accountAccountRelayAddress,
    gas,
    type: "eip1559",
  });

  console.log("REQUEST: ", request);

  return await client.writeContract(request);
};
