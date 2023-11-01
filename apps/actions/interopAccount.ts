import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";

export const handleCreateAccount: ActionFn = async (
  context: Context,
  event: Event
) => {
  // Send transaction on Mumbai network
  const blockEvent = event as TransactionEvent;

  // TODO: Send transaction to own server
};
