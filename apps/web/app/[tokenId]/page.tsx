"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import useSWR from "swr";
import { TokenboundClient } from "@tokenbound/sdk";
import { TokenDetail } from "./TokenDetail";
// Registry ABI
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

const registryAbi = [
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

interface TokenParams {
  params: {
    tokenId: string;
  };
  searchParams: {
    disableloading: string;
    logo?: string;
  };
}

const contractAddress = "0x138C677903ACf06fcaEb519580739413A2dE54eB";
const mainChainId = 5;
const relayChainId = 80001;
const implementation = "0x55266d75D1a14E4572138116aF39863Ed6596E7F";
const registry = "0x000000006551c19487814612e58FE06813775758";

async function getNfts(chainId: number, account: string) {
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

async function getAccount(
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

export default function Token({ params, searchParams }: TokenParams) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [nfts, setNfts] = useState<TbaOwnedNft[]>([]);
  const { tokenId } = params;
  const { disableloading, logo } = searchParams;
  const [showTokenDetail, setShowTokenDetail] = useState(false);
  const tokenboundClient = new TokenboundClient({ chainId: mainChainId });

  const {
    data: nftImages,
    nftMetadata,
    loading: nftMetadataLoading,
  } = useNft({
    tokenId: parseInt(tokenId as string),
    contractAddress: contractAddress as `0x${string}`,
    chainId: mainChainId,
  });

  useEffect(() => {
    if (nftImages && nftImages.length) {
      const imagePromises = nftImages.map((src: string) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = src;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    }
  }, [nftImages, nftMetadataLoading]);

  // Fetch nft's TBA
  const { data: account } = useSWR(
    tokenId ? `/account/${tokenId}` : null,
    async () => {
      const result = await getAccount(
        Number(tokenId),
        contractAddress,
        mainChainId
      );
      return result.data;
    }
  );

  // Get nft's TBA account bytecode to check if account is deployed or not
  const { data: accountIsDeployed } = useSWR(
    account ? `/account/${account}/bytecode` : null,
    async () =>
      tokenboundClient.checkAccountDeployment({
        accountAddress: account as `0x{string}`,
      })
  );

  async function fetchNfts(account: string) {
    const [chain_a_data, chain_b_data] = (await Promise.all([
      getNfts(mainChainId, account).then((data) =>
        data.map((nft) => ({ ...nft, chainId: mainChainId }))
      ),
      getNfts(relayChainId, account).then((data) =>
        data.map((nft) => ({ ...nft, chainId: relayChainId }))
      ),
    ])) as [TbaOwnedNft[], TbaOwnedNft[]];

    if (chain_a_data || chain_b_data) {
      let data: TbaOwnedNft[] = [];
      if (chain_a_data.length > 0) data = chain_a_data;
      if (chain_b_data.length > 0) data = [...data, ...chain_b_data];

      setNfts(data);
    }
  }

  // fetch nfts inside TBA
  useEffect(() => {
    if (account) {
      fetchNfts(account);
    }
  }, [account, accountIsDeployed, mainChainId]);

  const showLoading = disableloading !== "true" && nftMetadataLoading;

  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="max-w-screen relative mx-auto aspect-square max-h-screen overflow-hidden bg-white">
        <div className="relative h-full w-full">
          {account && nftImages && nftMetadata && (
            <TokenDetail
              isOpen={showTokenDetail}
              handleOpenClose={setShowTokenDetail}
              account={account}
              tokens={nfts}
              title={nftMetadata.title}
              chainId={mainChainId}
            />
          )}
          <div className="max-h-1080[px] relative h-full w-full max-w-[1080px] bg-black">
            {showLoading ? (
              <div className="z-10 w-full h-full flex flex-col justify-center items-center">
                <div className="w-1/2 mt-[40%] ml-[25px] h-1/2">
                  <img src="iframe/gaian_logo.png" className="animate-bounce" />
                </div>
              </div>
            ) : (
              <div
                className={`bg-white h-full w-full grid grid-cols-1 grid-rows-1 transition ${
                  imagesLoaded ? "" : "blur-xl"
                }`}
              >
                {nftImages ? (
                  nftImages?.map((image, i) => (
                    <img
                      key={i}
                      className="col-span-1 col-start-1 row-span-1 row-start-1 translate-x-0"
                      src={image}
                      alt="Nft image"
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
