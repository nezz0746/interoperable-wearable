import useNfts from "hooks/useNfts";
import { truncateAddress } from "utils";
import { Address } from "viem";
import Title from "./Title";
import { useAccount } from "wagmi";
import { useAccountNftStore } from "hooks/useAccountNft";
import Card from "./Card";
import Link from "next/link";

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
  const { metadata } = useAccountNftStore();
  const { nftsWithAccount, pendingNftsWithAccount } = useNfts({
    address,
  });

  return (
    <div className="">
      {nftsWithAccount.map((nft) => {
        return (
          <Card
            key={nft.account}
            className="border-none hover:bg-slate-500 hover:cursor-pointer"
          >
            <div className="h-[60px] flex flex-row gap-2">
              <img src={metadata?.image} className="h-full" />
              <div className="flex flex-col">
                <p className="font-main font-bold">
                  Interoperable Wearable Account #{nft.tokenId}
                </p>
                <p className="text-xs font-main font-light">{nft.account}</p>
              </div>
            </div>
          </Card>
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
