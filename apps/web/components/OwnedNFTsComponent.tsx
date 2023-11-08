import useNfts from "hooks/useNfts";
import { truncateAddress } from "utils";
import { Address } from "viem";
import { interopAccountAddress as interopAccountAddressImported } from "wagmi-config/generated";
import Title from "./Title";
import useChain from "hooks/useChain";
import { useAccount } from "wagmi";

const interopAccountAddress = interopAccountAddressImported as Record<
  number,
  Address
>;

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
  const { chainId } = useChain();
  const { nftsWithAccount, pendingNftsWithAccount } = useNfts({
    tokenContract: interopAccountAddress[chainId],
    address,
    chainId,
  });

  return (
    <>
      {nftsWithAccount.map((nft) => {
        return (
          <div
            key={nft.account}
            className=" border border-black h-[60px] flex flex-row gap-2"
          >
            <img src={squareSrc} className="h-full" />
            <div className="flex flex-col">
              <p className="font-main font-bold">
                Interoperable Wearable Account #{nft.tokenId}
              </p>
              <p className="text-sm font-main font-light">
                {truncateAddress(nft.account, 10)}
              </p>
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
