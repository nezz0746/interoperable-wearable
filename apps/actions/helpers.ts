import { EventFragment, id } from "ethers";

export const getTopicHash = (topic: string) => {
  return id(EventFragment.from(topic).format("sighash"));
};
