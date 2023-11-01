import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "wagmi-config/wagmi";

type DappProviderProps = {
  children: React.ReactNode;
};

const DappProvider = ({ children }: DappProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default DappProvider;
