import nft from "@/services/alchemy";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { useWalletClient } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";
import { NftWithAccount, useNftsStore } from "./useNftsStore";

type UseNFTProps = {
  tokenContract: Address;
  address: Address;
  chainId: number;
};

const useNfts = ({ tokenContract, address, chainId }: UseNFTProps) => {
  const { data: walletClient } = useWalletClient({ chainId });
  const {
    nftsWithAccount,
    setNftsWithAccount,
    pendingNftsWithAccount,
    clearPendingNFT,
  } = useNftsStore();
  const [currentIntervalId, setIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchNfts = useCallback(async () => {
    if (!nft[chainId] || !walletClient) return;

    const data = await nft[chainId].getMintedNfts(address, {
      contractAddresses: [tokenContract],
    });

    if (data.nfts) {
      const tokenbountClient = new TokenboundClient({
        // @ts-ignore
        walletClient,
        chainId,
      });

      const nfts = data.nfts.map((nft) => {
        const account = tokenbountClient.getAccount({
          tokenContract,
          tokenId: nft.tokenId,
        });

        return {
          ...nft,
          account,
        } as NftWithAccount;
      });

      const hashes = nfts.map((nft) => nft.transactionHash);

      if (
        pendingNftsWithAccount &&
        hashes.includes(pendingNftsWithAccount.hash)
      ) {
        clearPendingNFT();
        currentIntervalId && clearInterval(currentIntervalId);
        setIntervalId(null);
      }

      setNftsWithAccount(nfts);
    }
  }, [
    walletClient,
    tokenContract,
    address,
    chainId,
    pendingNftsWithAccount,
    currentIntervalId,
  ]);

  useEffect(() => {
    fetchNfts();
  }, [walletClient, address]);

  useEffect(() => {
    if (pendingNftsWithAccount) {
      const intervalId = setInterval(() => {
        fetchNfts();
      }, 3000);

      setIntervalId(intervalId);

      return () => clearInterval(intervalId);
    }
  }, [pendingNftsWithAccount]);

  return {
    nftsWithAccount,
    pendingNftsWithAccount,
    refetch: fetchNfts,
  };
};

export default useNfts;
