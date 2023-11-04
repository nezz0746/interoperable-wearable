import classNames from "classnames";
import { Address, formatEther } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import {
  useInteropAccountPrice,
  usePrepareInteropAccountCreateMainAccount,
} from "wagmi-config/generated";
import Title from "./Title";

const MintCardContent = () => {
  const { data: price } = useInteropAccountPrice();
  const { address } = useAccount();

  return (
    <div className=" border border-black max-h-[400px] flex flex-col p-4">
      <div className="flex flex-col gap-2">
        <Title text="Mint" />
        <div className="flex flex-row w-full font-main justify-between">
          <p>Price </p>
          <p>{price ? formatEther(price) : "--"} ETH</p>
        </div>
        {address && price ? (
          <MintButton address={address} price={price} />
        ) : null}
      </div>
    </div>
  );
};

type MintButtonProps = {
  address: Address;
  price: bigint;
};

const MintButton = ({ address, price }: MintButtonProps) => {
  const { config, isError } = usePrepareInteropAccountCreateMainAccount({
    args: [address],
    value: price,
  });

  const {
    data,
    write,
    isLoading: pendingConfirmation,
  } = useContractWrite(config);

  const { isLoading: transactionLoading } = useWaitForTransaction(data);

  const loading = pendingConfirmation || transactionLoading;
  const disabled = loading || isError;

  return (
    <button
      className={classNames("btn bg-black rounded-none", {
        loading,
      })}
      disabled={disabled}
      onClick={() => {
        write && write();
      }}
    >
      MINT
    </button>
  );
};

export default MintCardContent;
