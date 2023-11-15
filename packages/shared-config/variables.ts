export const alchemy_key = process.env.NEXT_PUBLIC_ALCHEMY_KEY as string;

if (!alchemy_key) {
  throw new Error("Missing: alchemy_key");
}

/**
 * WALLET CONNECT PROJECT ID
 */
export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID";

/**
 * NETWORK ENVIROMENT BOOLEANS
 */
export const localChainEnabled =
  process.env.NEXT_PUBLIC_LOCAL_CHAIN_ENABLED === "true";

export const testnetChainEnabled =
  process.env.NEXT_PUBLIC_TESTNET_CHAINS_ENABLED === "true";

export const mainnetChainEnabled =
  process.env.NEXT_PUBLIC_MAINNET_CHAINS_ENABLED === "true";
