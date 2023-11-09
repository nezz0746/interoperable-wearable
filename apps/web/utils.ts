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
