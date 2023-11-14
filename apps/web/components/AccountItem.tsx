import classNames from "classnames";
import useChain from "hooks/useChain";
import Link from "next/link";
import { chainIdToIcon } from "shared-config";
import { ItemMetadata } from "utils";

const formatWearableName = (name: string) => {
  return name.includes("-") ? name.split("-")[1] : name;
};

const AccountItem = ({
  chainId,
  image,
  name,
  blockExplorerLink,
}: ItemMetadata) => {
  const { isMainnet, isPolygon } = useChain();

  const isMainnetChain = isMainnet(chainId);
  const isPolygonChain = isPolygon(chainId);

  return (
    <Link href={blockExplorerLink} target="_blank">
      <div
        className={classNames(
          "border-indigo-600 relative px-2 pt-2 pb-4 flex flex-col gap-1 bg-opacity-50 hover:bg-opacity-70 hover:cursor-pointer",
          {
            "border-2 border-[#803DE1] bg-gradient-to-b  from-[#803DE1] ":
              isPolygonChain,
            "border-2 border-[#3339BC] bg-gradient-to-b  from-[#3339BC] ":
              isMainnetChain,
          }
        )}
      >
        <img src={image} className={classNames("h-auto max-w-full")} />
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-white text-sm">
            {formatWearableName(name)}
          </p>
          <img {...chainIdToIcon[chainId]} className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
};

export default AccountItem;
