import useNfts from "hooks/useNfts";
import { truncateAddress } from "utils";
import { Address } from "viem";
import Title from "./Title";
import { useAccount } from "wagmi";
import { useAccountNftStore } from "hooks/useAccountNft";

const squareSrc = "https://placehold.co/400x400";

const OwnedNFTsComponent = () => {
  const { address } = useAccount();

  return (
    <div className="border border-black flex flex-col p-4 gap-2">
      <Title text="My Accounts" />
      <div className="flex flex-col gap-2"></div>
      {address && <OwnedNFTList address={address} />}
    </div>
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
    <>
      {nftsWithAccount.map((nft) => {
        return (
          <div
            key={nft.account}
            className=" border border-black h-[60px] flex flex-row gap-2"
          >
            <img src={metadata?.image} className="h-full" />
            <div className="flex flex-col">
              <p className="font-main font-bold">
                Interoperable Wearable Account #{nft.tokenId}
              </p>
              <p className="text-sm font-main font-light">{nft.account}</p>
            </div>
          </div>
        );
      })}
      {pendingNftsWithAccount && (
        <div
          key={pendingNftsWithAccount.account}
          className="border border-black h-[60px] flex flex-row gap-2 border-opacity-30"
        >
          <img src={squareSrc} className="h-full" />
          <div className="flex flex-row justify-between w-full mr-2">
            <div className="flex flex-col">
              <p className="font-main font-bold">
                Interoperable Wearable Account #{pendingNftsWithAccount.tokenId}
              </p>
              <p className="text-sm font-main font-light">
                {pendingNftsWithAccount.account}
              </p>
            </div>
            <span className="loading loading-ring loading-sm"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnedNFTsComponent;
