import { getAlchemyNFT } from "shared-config";
import useSWR from "swr";
import { formatImageReturn, getAlchemyImageSrc } from "utils";

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

      return getAlchemyNFT(chainId).getNftMetadataBatch([
        { contractAddress, tokenId },
      ]);
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
