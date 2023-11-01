import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import {
  interopAccountRelayABI,
  interopAccountRelayAddress,
} from "wagmi-config/generated";

type AccountCreationArgs = {
  chainId: bigint;
  tokenContract: `0x${string}`;
  tokenId: bigint;
};

const account_key = process.env.RELAYER_PRIVATE_KEY as `0x${string}`;
const mumbai_rpc_url = process.env.MUMBAI_RPC_URL as string;

if (!account_key) {
  throw new Error("RELAYER_PRIVATE_KEY is not set");
}

if (!mumbai_rpc_url) {
  throw new Error("MUMBAI_RPC_URL is not set");
}

const getClient = (chain: Chain) =>
  createPublicClient({ chain, transport: http() });

const getRelayer = (chain: Chain, url: string) =>
  createWalletClient({
    account: privateKeyToAccount(account_key),
    chain,
    transport: http(url),
  });

export const createAccountOnSidechain = async ({
  chainId,
  tokenContract,
  tokenId,
}: AccountCreationArgs) => {
  // Create account on sidechain
  console.log("CREATE ACCOUNT ON SIDECHAIN: ", chainId, tokenContract, tokenId);

  const chains: Record<number, Chain> = {
    80001: polygonMumbai,
  };

  const rpcUrls: Record<number, string> = {
    80001: mumbai_rpc_url,
  };

  const chain = chains[Number(chainId)];
  const rpcUrl = rpcUrls[Number(chainId)];
  const accountRelayAddress =
    interopAccountRelayAddress[Number(chainId) as 80001];

  const client = getClient(chain);
  const account = getRelayer(chain, rpcUrl);
  const sender = (await account.getAddresses())[0];

  const { request } = await client.simulateContract({
    account: sender,
    address: accountRelayAddress,
    abi: interopAccountRelayABI,
    functionName: "createAccount",
    args: [chainId, tokenContract, tokenId],
  });

  await account.writeContract(request);
};
