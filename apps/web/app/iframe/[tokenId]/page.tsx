"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import useSWR from "swr";
import { TokenboundClient } from "@tokenbound/sdk";
import { TokenDetail } from "./TokenDetail";
import { getAccount, getNfts } from "iframe-utils";
import { interopAccountAddress } from "utils";
import { useNft } from "hooks/useNftsIframe";
import {
  interopAccountChainId,
  interopAccoutRelayChainId,
} from "shared-config";
import { TbaOwnedNft } from "types";

export interface TokenParams {
  params: {
    tokenId: string;
  };
  searchParams: {
    disableloading: string;
    logo?: string;
  };
}

export default function Token({ params, searchParams }: TokenParams) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [nfts, setNfts] = useState<TbaOwnedNft[]>([]);
  const { tokenId } = params;
  const { disableloading } = searchParams;
  const [showTokenDetail, setShowTokenDetail] = useState(false);
  const tokenboundClient = new TokenboundClient({
    chainId: interopAccountChainId,
  });

  const {
    data: nftImages,
    nftMetadata,
    loading: nftMetadataLoading,
  } = useNft({
    tokenId: parseInt(tokenId as string),
    contractAddress: interopAccountAddress[interopAccountChainId],
    chainId: interopAccountChainId,
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
        interopAccountAddress[interopAccountChainId],
        interopAccountChainId
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
      getNfts(interopAccountChainId, account).then((data) =>
        data.map((nft) => ({ ...nft, chainId: interopAccountChainId }))
      ),
      getNfts(interopAccoutRelayChainId, account).then((data) =>
        data.map((nft) => ({ ...nft, chainId: interopAccoutRelayChainId }))
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
  }, [account, accountIsDeployed, interopAccountChainId]);

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
              chainId={interopAccountChainId}
            />
          )}
          <div className="max-h-1080[px] relative h-full w-full max-w-[1080px] bg-black">
            {showLoading ? (
              <div className="z-10 w-full h-full flex flex-col justify-center items-center">
                <div className="w-1/2 mt-[40%] ml-[25px] h-1/2">
                  <img
                    src="/iframe/gaian_logo.png"
                    className="animate-bounce"
                  />
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
