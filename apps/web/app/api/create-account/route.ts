import { TransactionEvent } from "@tenderly/actions";
import { NextRequest, NextResponse } from "next/server";
import {
  interopAccountNftABI,
  erc6551RegistryABI,
  accountProxyABI,
} from "wagmi-config/generated";
import { decodeEventLog } from "viem";
import { createAccountOnSidechain } from "@/services/interopAccountRelay";

export async function POST(req: NextRequest) {
  const body: TransactionEvent & { gateway: string; chainId: string } =
    await req.json();

  const abis = [
    ...interopAccountNftABI,
    ...erc6551RegistryABI,
    ...accountProxyABI,
  ];

  let accountCreationTxHash: string | undefined;
  if (body.logs.length === 0) return NextResponse.json({ message: "No logs" });

  console.log("BODY: ", JSON.stringify(body));
  console.log("LOGS: ", JSON.stringify(body.logs));

  for (const log of body.logs) {
    try {
      const event = decodeEventLog({
        abi: abis,
        data: log.data as `0x${string}`,
        // @ts-ignore
        topics: log.topics,
      });

      if (event.eventName === "CreateMainAccount") {
        const { chainId, tokenContract, tokenId } = event.args;

        const rpcURL = body.gateway;
        const relayerChainId = parseInt(body.chainId);

        accountCreationTxHash = await createAccountOnSidechain(
          {
            chainId,
            tokenContract,
            tokenId,
          },
          { rpcURL, chainId: relayerChainId }
        );
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return NextResponse.json({ accountCreationTxHash });
}
