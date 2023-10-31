// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";

contract CounterScript is BaseScript {
    DeployementChain[] deploymentChains;

    function setUp() public {
        forks[DeployementChain.Anvil] = "local";
        forks[DeployementChain.Goerli] = "goerli";
    }

    function deployCounterLocal() public setEnvDeploy(Cycle.Local) {
        deploymentChains.push(DeployementChain.Anvil);

        _deployCounter(deploymentChains);
    }

    function deployCounterTesnet() public setEnvDeploy(Cycle.Testnet) {
        deploymentChains.push(DeployementChain.Goerli);

        _deployCounter(deploymentChains);
    }

    function _deployCounter(
        DeployementChain[] memory targetChains
    ) internal broadcastOn(targetChains) {
        // _saveImplementations(address(counter), "Counter");
    }
}
