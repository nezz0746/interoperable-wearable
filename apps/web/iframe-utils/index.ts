import { formatBytes32String } from "ethers/lib/utils";
import { Nft, NftOrdering, OwnedNft } from "alchemy-sdk";
import {
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
} from "viem/chains";
import { createPublicClient, http } from "viem";
import nft from "@/services/alchemy";
import useSWR from "swr";

export const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY || "";

const getViemNetwork = (chainId: number) => {
  if (chainId === 1) return mainnet;
  if (chainId === 137) return polygon;
  if (chainId === 420) return optimism;
  if (chainId === 5) return goerli;
  if (chainId === 80001) return polygonMumbai;
  if (chainId === 11155111) return sepolia;
};

export const getPublicClient = (chainId: number, providerEndpoint?: string) => {
  const chain = getViemNetwork(chainId);
  const publicClient = createPublicClient({
    chain: chain,
    transport: providerEndpoint ? http(providerEndpoint) : http(),
  });
  return publicClient;
};

export const registryAbi = [
  { inputs: [], name: "AccountCreationFailed", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenContract",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC6551AccountCreated",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "implementation", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "tokenContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "account",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "implementation", type: "address" },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "tokenContract", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "createAccount",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function getAlchemyImageSrc(token?: Nft | OwnedNft) {
  // mint count for selected tokens

  if (!token) {
    return "/no-img.jpg";
  }

  const src =
    token.media[0]?.gateway ||
    token.media[0]?.thumbnail ||
    token.contract?.openSea?.imageUrl ||
    "/no-img.jpg";

  return src;
}

interface FormatImageReturnParams {
  imageData?: string | string[];
  loading: boolean;
}

function formatImageReturn({
  imageData,
  loading,
}: FormatImageReturnParams): string[] | null {
  if (loading) return null;

  if (!imageData) {
    return ["/no-img.jpg"];
  }

  return typeof imageData === "string" ? [imageData] : imageData;
}

type UseNFTParams = {
  tokenId: number;
  contractAddress: `0x${string}`;
  chainId: number;
};

export const useNft = ({ tokenId, contractAddress, chainId }: UseNFTParams) => {
  const { data: nftMetadata, isLoading: nftMetadataLoading } = useSWR(
    `nftMetadata/${contractAddress}/${tokenId}`,
    (url: string) => {
      const [, contractAddress, tokenId] = url.split("/");

      return nft[chainId].getNftMetadataBatch([{ contractAddress, tokenId }]);
    }
  );

  const loading = nftMetadataLoading;

  return {
    data: formatImageReturn({
      imageData: getAlchemyImageSrc(nftMetadata?.[0]),
      loading,
    }),
    nftMetadata: nftMetadata?.[0],
    loading,
  };
};

export interface TbaOwnedNft extends OwnedNft {
  hasApprovals?: boolean | undefined;
  chainId: number;
  [key: string]: any;
}

export interface TokenParams {
  params: {
    tokenId: string;
  };
  searchParams: {
    disableloading: string;
    logo?: string;
  };
}

const implementation = "0x55266d75D1a14E4572138116aF39863Ed6596E7F";
const registry = "0x000000006551c19487814612e58FE06813775758";

export async function getNfts(chainId: number, account: string) {
  try {
    const response = await nft[chainId].getNftsForOwner(account, {
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

export const chainIdToRpcUrl: Record<number, string> = {
  1: `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
  5: `https://eth-goerli.g.alchemy.com/v2/${alchemyApiKey}`,
  11155111: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
  420: `https://opt-goerli.g.alchemy.com/v2/${alchemyApiKey}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
  80001: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyApiKey}`,
};

export async function getAccount(
  tokenId: number,
  contractAddress: string,
  chainId: number
) {
  try {
    const providerUrl = chainIdToRpcUrl[chainId];
    const publicClient = getPublicClient(chainId, providerUrl);
    const response = (await publicClient.readContract({
      address: registry as `0x${string}`,
      abi: registryAbi,
      functionName: "account",
      args: [
        implementation,
        formatBytes32String(""),
        String(chainId),
        contractAddress,
        tokenId,
      ],
    })) as string;
    return { data: response };
  } catch (err) {
    console.error(err);
    return { error: `failed getting account for token $id: {tokenId}` };
  }
}
