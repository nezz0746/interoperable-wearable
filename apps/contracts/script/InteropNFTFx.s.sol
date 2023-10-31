// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";

import {InteropNFTMain, InteropNFTSide} from "../src/InteropNFTMainFx.sol";

contract DeployInteropNFT is BaseScript {
    /**
     * @notice STEP 1: Deploy InteropNFT (main chain & side chain)
     */
    function deployInteropNFTTestnet() public {
        _setChainsTestnet();

        _deployInteropNFTSideTestNet(sideChains);
        _deployInteropNFTMainTestNet(mainChains);
    }

    /**
     * @notice STEP 2: Set FxRootTunnel & FxChildTunnel
     */
    function setTunnelContractsTestnet(
        address fxRootTunnel,
        address fxChildTunnel
    ) public {
        _setChainsTestnet();

        _setFxRootTunnel(fxRootTunnel, fxChildTunnel, sideChains);
        _setFxChildTunnel(fxRootTunnel, fxChildTunnel, mainChains);
    }

    function createAccount(address mainAddress) public {
        _setChainsTestnet();

        _createAccount(mainAddress, mainChains);
    }

    function _createAccount(
        address mainAddress,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        InteropNFTMain main = InteropNFTMain(mainAddress);
        (, address sender, ) = vm.readCallers();

        main.createMainAccount{value: 0.1 ether}(sender);
    }

    function _deployInteropNFTMainTestNet(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        console2.log("CheckpointManager: ", goerliCheckpointManager);
        console2.log("FxRoot: ", goerliFxRoot);
        console2.log("registry: ", registry);
        console2.log("accountProxy: ", accountProxy);
        console2.log("accountImplementation: ", accountImplementation);
        console2.log("maxSupply: ", maxSupply);
        console2.log("price: ", price);

        InteropNFTMain main = new InteropNFTMain(
            goerliCheckpointManager,
            goerliFxRoot,
            registry,
            accountProxy,
            accountImplementation,
            maxSupply,
            price
        );

        _saveImplementations(address(main), "InteropNFTMain");
    }

    function _deployInteropNFTSideTestNet(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        console2.log("FxChild: ", mumbaiFxChild);
        console2.log("registry: ", registry);
        console2.log("accountProxy: ", accountProxy);
        console2.log("accountImplementation: ", accountImplementation);

        InteropNFTSide side = new InteropNFTSide(
            mumbaiFxChild,
            registry,
            accountProxy,
            accountImplementation
        );

        _saveImplementations(address(side), "InteropNFTSide");
    }

    function _setFxRootTunnel(
        address fxRootTunnel,
        address fxChildTunnel,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        require(fxChildTunnel != address(0), "FxChildTunnel not set");
        require(fxRootTunnel != address(0), "FxRootTunnel not set");

        InteropNFTSide side = InteropNFTSide(fxChildTunnel);

        side.setFxRootTunnel(fxRootTunnel);
    }

    function _setFxChildTunnel(
        address fxRootTunnel,
        address fxChildTunnel,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        require(fxChildTunnel != address(0), "FxChildTunnel not set");
        require(fxRootTunnel != address(0), "FxRootTunnel not set");

        InteropNFTMain main = InteropNFTMain(fxRootTunnel);

        main.setFxChildTunnel(fxChildTunnel);
    }
}
