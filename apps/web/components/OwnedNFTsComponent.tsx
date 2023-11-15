import useNfts from "hooks/useNfts";
import { truncateAddress } from "utils";
import { Address } from "viem";
import Title from "./Title";
import { useAccount } from "wagmi";
import Card from "./Card";
import useChain from "hooks/useChain";
import { chainIdToChain } from "shared-config";
import useAccountNft from "hooks/useAccountNft";

const squareSrc = "https://placehold.co/400x400";

const OwnedNFTsComponent = () => {
  const { address } = useAccount();

  return (
    <Card className="gap-2">
      <div className="flex flex-col p-4 gap-2">
        <Title text="My Accounts" />
        <div className="flex flex-col gap-2"></div>
        {address && <OwnedNFTList address={address} />}
      </div>
    </Card>
  );
};

type OwnedNFTListProps = {
  address: Address;
};

const OwnedNFTList = ({ address }: OwnedNFTListProps) => {
  const { metadata } = useAccountNft();
  const { mainChainId } = useChain();
  const { nftsWithAccount, pendingNftsWithAccount } = useNfts({
    address,
  });

  return (
    <div className="flex flex-col gap-1">
      {nftsWithAccount.map((nft) => {
        return (
          <div
            key={nft.account}
            onClick={() => {
              window.open(
                chainIdToChain[mainChainId].blockExplorers?.default.url +
                  "/address/" +
                  nft.account,
                "_blank"
              );
            }}
            className="border-none hover:bg-slate-500 hover:cursor-pointer"
          >
            <div className="h-[60px] flex flex-row gap-2">
              <img src={metadata?.image} className="h-full" />
              <div className="flex flex-col">
                <p className="font-main font-bold">
                  Interoperable Wearable Account #{nft.tokenId}
                </p>
                <p className="text-xs font-main font-light">
                  {truncateAddress(nft.account, 10)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {pendingNftsWithAccount && (
        <Card
          key={pendingNftsWithAccount.account}
          className="border-none opacity-70 bg-slate-400"
        >
          <div className="h-[60px] flex flex-row gap-2">
            <img src={metadata?.image} className="h-full" />
            <div className="flex flex-row justify-between w-full mr-2">
              <div className="flex flex-col">
                <p className="font-main font-bold">
                  Interoperable Wearable Account #
                  {pendingNftsWithAccount.tokenId}
                </p>
                <p className="text-sm font-main font-light">
                  Packing wearables...
                </p>
              </div>
              <span className="loading loading-bars text-white opacity-100 loading-md"></span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OwnedNFTsComponent;
