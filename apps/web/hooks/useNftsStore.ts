import { TransferredNft } from "alchemy-sdk";
import { Address } from "viem";
import { create } from "zustand";

export type NftWithAccount = TransferredNft & {
  account: Address;
};

export type PendingNftWithAccount = Partial<NftWithAccount> & {
  hash: string;
};

type OwnedNFTsStore = {
  nftsWithAccount: NftWithAccount[];
  setNftsWithAccount: (nftsWithAccount: NftWithAccount[]) => void;
  pendingNftsWithAccount?: PendingNftWithAccount;
  addPendingNFT: (ownedNft: PendingNftWithAccount) => void;
  clearPendingNFT: () => void;
};

export const useNftsStore = create<OwnedNFTsStore>((set) => ({
  nftsWithAccount: [],
  setNftsWithAccount: (nftsWithAccount: NftWithAccount[]) =>
    set((state) => ({
      ...state,
      nftsWithAccount,
    })),
  pendingNftsWithAccount: undefined,
  addPendingNFT: (pendingNft: PendingNftWithAccount) => {
    set((state) => ({
      ...state,
      pendingNftsWithAccount: pendingNft,
    }));
  },
  clearPendingNFT: () => {
    set((state) => ({
      ...state,
      pendingNftsWithAccount: undefined,
    }));
  },
}));
