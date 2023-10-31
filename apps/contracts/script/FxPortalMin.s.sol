pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";

import {RootContract, ChildContract} from "../src/FxPortalMin.sol";

contract DeployPortal is BaseScript {
    function deployPortal() public {
        _setChainsTestnet();

        _deployRoot(mainChains);
        _deployChild(sideChains);
    }

    function activateTunnel(
        address fxRootTunnel,
        address fxChildTunnel
    ) public {
        _setChainsTestnet();

        _setFxRootInChild(fxRootTunnel, fxChildTunnel, sideChains);
        _setFxChildInRoot(fxRootTunnel, fxChildTunnel, mainChains);
    }

    function sendMessages(address fxRootTunnel, address fxChildTunnel) public {
        _setChainsTestnet();

        _sendMessageToChild(fxRootTunnel, mainChains);
        _sendMessageToRoot(fxChildTunnel, sideChains);
    }

    function _sendMessageToChild(
        address fxRootTunnel,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        RootContract root = RootContract(fxRootTunnel);

        root.sendMessage("Hello from Root");
    }

    function _sendMessageToRoot(
        address fxChildTunnel,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        ChildContract child = ChildContract(fxChildTunnel);

        child.sendMessage("Hello from Child");
    }

    function _deployRoot(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        RootContract root = new RootContract(
            goerliCheckpointManager,
            goerliFxRoot
        );

        _saveImplementations(address(root), "RootContract");
    }

    function _deployChild(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        ChildContract child = new ChildContract(mumbaiFxChild);

        _saveImplementations(address(child), "ChildContract");
    }

    function _setFxChildInRoot(
        address rootAddress,
        address childAddress,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        RootContract root = RootContract(rootAddress);

        root.setFxChildTunnel(childAddress);
    }

    function _setFxRootInChild(
        address rootAddress,
        address childAddress,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        ChildContract child = ChildContract(childAddress);

        child.setFxRootTunnel(rootAddress);
    }
}
