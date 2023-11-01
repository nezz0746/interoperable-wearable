import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";

export const handleCreateAccount: ActionFn = async (
  context: Context,
  event: Event
) => {
  // Send transaction on Mumbai network
  const blockEvent = event as TransactionEvent;

  const baseURL = await context.storage.getStr("apiBaseURL");

  const relayerURL = `${baseURL}/api/create-account`;

  console.log("Sending to relayer", relayerURL);

  await fetch(relayerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blockEvent),
  });
};
