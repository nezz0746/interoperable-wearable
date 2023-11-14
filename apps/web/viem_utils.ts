import { chainIdToChain, chainIdToRpcUrl } from "shared-config";
import { relayer_account_key } from "shared-config/secret";
import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const getWalletClient = (chainId: number) => {
  const chain = chainIdToChain[chainId];

  const rpc_url = chainIdToRpcUrl[chainId];

  console.log("RELAYER CLIENT: ", {
    chain,
    rpc_url,
  });

  return createWalletClient({
    account: privateKeyToAccount(relayer_account_key),
    chain,
    transport: http(rpc_url),
  }).extend(publicActions);
};
