import useChain from "./useChain";
import { useEffect, useMemo, useState } from "react";
import { ItemMetadata, ItemProps, fetchMetadata } from "utils";
import {
  useInteropAccountGetItems,
  useInteropAccountRelayGetItems,
} from "wagmi-config/generated";

const useAccountItems = () => {
  const [itemsMetadata, setItemsMetadata] = useState<ItemMetadata[]>([]);
  const { mainChainId, relayChainId, chains } = useChain();

  const { data: accountDeliverable } = useInteropAccountGetItems({
    // @ts-ignore
    chainId: mainChainId,
  });
  const { data: relayDeliverables } = useInteropAccountRelayGetItems({
    // @ts-ignore
    chainId: relayChainId,
  });

  const items = useMemo(() => {
    const accountItems =
      accountDeliverable?.map((item) => ({
        ...item,
        chainId: mainChainId,
      })) ?? ([] as ItemProps[]);

    const relayItems =
      relayDeliverables?.map((item) => ({
        // @ts-ignore
        ...item,
        chainId: relayChainId,
      })) ?? ([] as ItemProps[]);

    return [...accountItems, ...relayItems];
  }, [accountDeliverable, relayDeliverables]);

  const fetchAccountItems = async () => {
    const metadata = await Promise.all(
      items.map(async ({ uri, contractAddress, chainId }) => {
        const data = await fetchMetadata(uri.split("//")[1]);

        return {
          ...data,
          image: `https://ipfs.io/ipfs/${data.image.split("//")[1]}`,
          contractAddress,
          chainId,
          blockExplorerLink: `${
            chains.find((chain) => chain.id === chainId)?.blockExplorers
              ?.default.url
          }/token/${contractAddress}`,
        };
      })
    );

    setItemsMetadata(metadata);
  };

  useEffect(() => {
    if (items.length > 0) {
      fetchAccountItems();
    }
  }, [items]);

  return {
    itemsMetadata,
  };
};

export default useAccountItems;
