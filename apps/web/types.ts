import { OwnedNft } from "alchemy-sdk";

export interface TbaOwnedNft extends OwnedNft {
  hasApprovals?: boolean | undefined;
  chainId: number;
  [key: string]: any;
}
