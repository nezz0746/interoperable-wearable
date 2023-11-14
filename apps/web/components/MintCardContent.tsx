import classNames from "classnames";
import { Address, formatEther } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import {
  useInteropAccountMaxSupply,
  useInteropAccountName,
  useInteropAccountPrice,
  useInteropAccountTotalSupply,
  usePrepareInteropAccountCreateMainAccount,
} from "wagmi-config/generated";
import Title from "./Title";
import OwnedNFTsComponent from "./OwnedNFTsComponent";
import useChain from "hooks/useChain";
import { useNftsStore } from "hooks/useNftsStore";
import { truncateAddress } from "utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useAppAddresses from "hooks/useAppAddresses";
import { useMemo } from "react";
import Card from "./Card";
import { chainIdToChain } from "shared-config";

const MintCardContent = () => {
  const { address } = useAccount();
  const { accountContractAddress } = useAppAddresses();
  const { unsupportedChain, currentChainId, mainChainId } = useChain();

  const mintFunctionsDisabled =
    currentChainId !== mainChainId || unsupportedChain;

  const { data: price } = useInteropAccountPrice({
    enabled: !mintFunctionsDisabled,
    chainId: mainChainId,
  });

  const { data: name } = useInteropAccountName({
    enabled: !mintFunctionsDisabled,
    chainId: mainChainId,
  });

  const { data: totalSupply } = useInteropAccountTotalSupply({
    enabled: !mintFunctionsDisabled,
    chainId: mainChainId,
  });

  const { data: maxSupply } = useInteropAccountMaxSupply({
    enabled: !mintFunctionsDisabled,
    chainId: mainChainId,
  });

  const progressStats = useMemo(() => {
    if (totalSupply === undefined || maxSupply === undefined)
      return { ratio: 0 };

    return {
      ratio: (Number(totalSupply) / Number(maxSupply)) * 100,
      totalSupply: Number(totalSupply),
      maxSupply: Number(maxSupply),
    };
  }, [totalSupply, maxSupply]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="max-h-[400px] flex flex-col p-4">
          <div className="flex flex-col gap-2">
            <Title text="Mint" />
            <div className="flex flex-col my-2 gap-1">
              <div className="flex flex-row w-full font-main justify-between">
                <p>{name} </p>
                {chainIdToChain[mainChainId] && (
                  <Link
                    target="_blank"
                    href={`${chainIdToChain[mainChainId].blockExplorers?.default.url}/address/${accountContractAddress}`}
                    className="flex flex-row items-center border px-2 hover:bg-slate-200 hover:cursor-pointer"
                  >
                    <p>{truncateAddress(accountContractAddress, 6)}</p>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </div>
              <div className="flex flex-row w-full font-main justify-between">
                <p>Price</p>
                <p>{price ? formatEther(price) : "--"} ETH</p>
              </div>
              {progressStats && <Progress {...progressStats} />}
            </div>
            {address && price ? (
              <MintButton
                enabled={!mintFunctionsDisabled}
                address={address}
                price={price}
              />
            ) : null}
          </div>
        </div>
      </Card>
      <OwnedNFTsComponent />
    </div>
  );
};

type ProgressProps = {
  ratio: number;
  totalSupply?: number;
  maxSupply?: number;
};

const Progress = ({ ratio, totalSupply, maxSupply }: ProgressProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between font-main">
        <p>Minted</p>
        <p>
          {totalSupply}/{maxSupply}
        </p>
      </div>
      <div className="relative w-full h-2 border overflow-hidden">
        <div
          className="absolute top-0 left-0 h-2 bg-green-400"
          style={{ width: `${ratio}%` }}
        />
      </div>
    </div>
  );
};

type MintButtonProps = {
  address: Address;
  price: bigint;
  enabled?: boolean;
};

const MintButton = ({ address, price, enabled }: MintButtonProps) => {
  const addPendingNFT = useNftsStore((state) => state.addPendingNFT);
  const { config, isError } = usePrepareInteropAccountCreateMainAccount({
    args: [address],
    value: price,
    enabled,
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
  const disabled = loading || isError || enabled === false;

  const onClick = () => {
    write && write();
  };

  return (
    <button
      className={classNames("btn btn-accent rounded-none")}
      disabled={disabled}
      onClick={onClick}
    >
      {loading && <span className="loading loading-spinner"></span>}
      MINT
    </button>
  );
};

export default MintCardContent;
