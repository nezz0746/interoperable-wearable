import { Address } from "viem";
import {
  interopAccountAddress as interopAccountAddressImported,
  interopAccountRelayAddress as interopAccountRelayAddressImported,
} from "wagmi-config/generated";

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
