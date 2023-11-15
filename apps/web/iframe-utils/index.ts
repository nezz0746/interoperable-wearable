import { formatBytes32String } from "ethers/lib/utils";
import { NftOrdering, OwnedNft } from "alchemy-sdk";
import { erc6551RegistryABI } from "wagmi-config/generated";
import {
  accountV3Implementation,
  erc6551RegistryAddress,
  getAlchemyNFT,
  getPublicClient,
} from "shared-config";

export async function getNfts(chainId: number, account: string) {
  try {
    const response = await getAlchemyNFT(chainId).getNftsForOwner(account, {
      orderBy: NftOrdering.TRANSFERTIME,
    });
    if (!response.ownedNfts) {
      return [];
    }

    return response.ownedNfts.reverse();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getAccount(
  tokenId: number,
  contractAddress: string,
  chainId: number
) {
  try {
    const client = getPublicClient(chainId);

    const response = (await client.readContract({
      address: erc6551RegistryAddress,
      abi: erc6551RegistryABI,
      functionName: "account",
      args: [
        accountV3Implementation,
        formatBytes32String("") as `0x${string}`,
        BigInt(chainId),
        contractAddress as `0x${string}`,
        BigInt(tokenId),
      ],
    })) as string;
    return { data: response };
  } catch (err) {
    console.error(err);
    return { error: `failed getting account for token $id: {tokenId}` };
  }
}
