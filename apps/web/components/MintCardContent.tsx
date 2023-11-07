import classNames from "classnames";
import { Address, formatEther } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import {
  useInteropAccountPrice,
  usePrepareInteropAccountCreateMainAccount,
} from "wagmi-config/generated";
import Title from "./Title";
import OwnedNFTsComponent from "./OwnedNFTsComponent";
import useChain from "hooks/useChain";
import { useNftsStore } from "hooks/useNftsStore";

const MintCardContent = () => {
  const { unsupportedChain } = useChain();

  const { data: price } = useInteropAccountPrice({
    enabled: !unsupportedChain,
  });

  const { address } = useAccount();

  return (
    <>
      <div className=" border border-black max-h-[400px] flex flex-col p-4">
        <div className="flex flex-col gap-2">
          <Title text="Mint" />
          <div className="flex flex-row w-full font-main justify-between">
            <p>Price </p>
            <p>{price ? formatEther(price) : "--"} ETH</p>
          </div>
          {address && price ? (
            <MintButton
              unsupportedChain={unsupportedChain}
              address={address}
              price={price}
            />
          ) : null}
        </div>
      </div>
      <OwnedNFTsComponent />
    </>
  );
};

type MintButtonProps = {
  address: Address;
  price: bigint;
  unsupportedChain: boolean;
};

const MintButton = ({ address, price, unsupportedChain }: MintButtonProps) => {
  const addPendingNFT = useNftsStore((state) => state.addPendingNFT);
  const { config, isError } = usePrepareInteropAccountCreateMainAccount({
    args: [address],
    value: price,
    enabled: !unsupportedChain,
  });

  const {
    data,
    write,
    isLoading: pendingConfirmation,
  } = useContractWrite({
    ...config,
    onSuccess: ({ hash }) => {
      addPendingNFT({ tokenId: "???", account: `0x[...]`, hash });
    },
  });

  const { isLoading: transactionLoading } = useWaitForTransaction(data);

  const loading = pendingConfirmation || transactionLoading;
  const disabled = loading || isError || unsupportedChain;

  const onClick = () => {
    write && write();
  };

  return (
    <button
      className={classNames("btn btn-neutral rounded-none")}
      disabled={disabled}
      onClick={onClick}
    >
      {loading && <span className="loading loading-spinner"></span>}
      MINT
    </button>
  );
};

export default MintCardContent;
