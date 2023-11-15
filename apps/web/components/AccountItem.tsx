import classNames from "classnames";
import useChain from "hooks/useChain";
import Link from "next/link";
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
          "border-indigo-600 relative p-2 flex flex-col gap-1 bg-opacity-50 hover:bg-opacity-70 hover:cursor-pointer",
          {
            "bg-indigo-400": isMainnetChain,
            "bg-violet-400": isPolygonChain,
          }
        )}
      >
        <img src={image} className={classNames("h-auto max-w-full")} />
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-white text-sm">
            {formatWearableName(name)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AccountItem;
