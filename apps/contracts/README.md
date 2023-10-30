## Interop NFT

```bash

# Step 1:
forge script DeployInteropNFT -s 'deployInteropNFTTestnet()'

# Step 2: Get $ROOT (InterNFTMain) & child (InteropNFTSide) contract addresses
forge script DeployInteropNFT -s 'setTunnelContractsTestnet(address,address)' $ROOT $CHILD

```
