import nft from "@/services/alchemy";
import { OwnedNft } from "alchemy-sdk";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { useWalletClient } from "wagmi";
import { TokenboundClient } from "@tokenbound/sdk";

type UseNFTProps = {
  tokenContract: Address;
  address: Address;
  chainId: number;
};

type OwneNFTWithAccount = OwnedNft & {
  account: Address;
};

const useNfts = ({ tokenContract, address, chainId }: UseNFTProps) => {
  const { data: walletClient } = useWalletClient({ chainId });
  const [ownedNftsWithAccount, setOwnedNftsWithAccount] = useState<
    OwneNFTWithAccount[]
  >([]);

  const fetchNfts = useCallback(async () => {
    if (!nft[chainId] || !walletClient) return;

    const data = await nft[chainId].getNftsForOwner(address, {
      contractAddresses: [tokenContract],
    });

    if (data.ownedNfts) {
      console.log({ walletClient });
      const tokenbountClient = new TokenboundClient({
        // @ts-ignore
        walletClient,
        chainId,
      });

      const ownedNftsWithAccount = data.ownedNfts.map((ownedNft) => {
        const account = tokenbountClient.getAccount({
          tokenContract,
          tokenId: ownedNft.tokenId,
        });

        return {
          ...ownedNft,
          account,
        } as OwneNFTWithAccount;
      });

      setOwnedNftsWithAccount(ownedNftsWithAccount);
    }
  }, [walletClient]);

  useEffect(() => {
    fetchNfts();
  }, [walletClient, address]);

  return {
    ownedNftsWithAccount,
  };
};

export default useNfts;
