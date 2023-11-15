import classNames from "classnames";
import useChain from "hooks/useChain";
import Link from "next/link";
import { ItemMetadata } from "utils";

const AccountItem = ({ chainId, image, blockExplorerLink }: ItemMetadata) => {
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
      </div>
    </Link>
  );
};

export default AccountItem;
