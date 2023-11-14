import { Nft, OwnedNft } from "alchemy-sdk";
import { Address } from "viem";
import {
  interopAccountAddress as interopAccountAddressImported,
  interopAccountRelayAddress as interopAccountRelayAddressImported,
} from "wagmi-config/generated";

export type ItemMetadata = {
  name: string;
  description: string;
  image: string;
  contractAddress: string;
  chainId: number;
  blockExplorerLink: string;
};

export type ItemProps = {
  uri: string;
  contractAddress: string;
  chainId: number;
};

export const interopAccountAddress = interopAccountAddressImported as Record<
  number,
  Address
>;

export const interopAccountRelayAddress =
  interopAccountRelayAddressImported as Record<number, Address>;

export const truncateAddress = (address?: string, length = 4) => {
  return `${address?.slice(0, length) ?? ""}...${
    address?.slice(-length) ?? ""
  }`;
};

export const fetchMetadata = async (cid: string) => {
  const res = await fetch(`https://ipfs.io/ipfs/${cid}`).then((res) =>
    res.json()
  );

  return res;
};

export function getAlchemyImageSrc(token?: Nft | OwnedNft) {
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

export function formatImageReturn({
  imageData,
  loading,
}: FormatImageReturnParams): string[] | null {
  if (loading) return null;

  if (!imageData) {
    return ["/no-img.jpg"];
  }

  return typeof imageData === "string" ? [imageData] : imageData;
}
