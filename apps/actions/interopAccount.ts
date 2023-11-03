import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import axios from "axios";

/**
 * ACTION PURPOSE:
 * - Send the transaction to the InteropAccountRelayer when an account is created
 * on the main chain
 */
export const handleCreateAccount: ActionFn = async (
  context: Context,
  event: Event
) => {
  // Send transaction on Mumbai network
  const blockEvent = event as TransactionEvent;

  // Define all the data needed to send to the relayer in the web3-action
  const baseURL = await context.storage.getStr("apiBaseURL");

  const relayerURL = `${baseURL}/api/create-account`;

  const { data } = await axios.post(relayerURL, blockEvent, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Relayer response", data);
};
