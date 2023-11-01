import { TransactionEvent } from "@tenderly/actions";
import { NextRequest, NextResponse } from "next/server";
import {
  interopAccountNftABI,
  erc6551RegistryABI,
  accountProxyABI,
} from "wagmi-config/generated";
import { decodeEventLog } from "viem";

type AccountCreationArgs = {
  chainId: bigint;
  tokenContract: string;
  tokenId: bigint;
};

const createAccountOnSidechain = async ({
  chainId,
  tokenContract,
  tokenId,
}: AccountCreationArgs) => {
  // Create account on sidechain

  console.log("CREATE ACCOUNT ON SIDECHAIN: ", chainId, tokenContract, tokenId);
};

export async function POST(req: NextRequest) {
  const body: TransactionEvent = await req.json();

  const abis = [
    ...interopAccountNftABI,
    ...erc6551RegistryABI,
    ...accountProxyABI,
  ];

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

        await createAccountOnSidechain({ chainId, tokenContract, tokenId });
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return NextResponse.json({ abis });
}
