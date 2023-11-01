// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";

import {InteropAccountNFT} from "../src/InteropAccount.sol";
import {InteropAccountRelay} from "../src/InteropAccountRelay.sol";

contract DeployIWS is BaseScript {
    function mintAccount(address interopAccount) public {
        _setChainsTestnet();

        _createAccount(interopAccount, mainChains);
    }

    function deployInterop() public {
        _setChainsTestnet();

        _deployInterop(mainChains);
        _deployRelay(sideChains);
    }

    function _createAccount(
        address interopAccount,
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        (, address sender, ) = vm.readCallers();

        InteropAccountNFT(interopAccount).createMainAccount{value: 0.1 ether}(
            sender
        );
    }

    function _deployInterop(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        InteropAccountNFT interopNFT = new InteropAccountNFT(
            registry,
            accountProxy,
            accountImplementation,
            100
        );

        interopNFT.setPrice(0.1 ether);

        _saveImplementations(address(interopNFT), "InteropAccount");
    }

    function _deployRelay(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        InteropAccountRelay interopRelay = new InteropAccountRelay(
            registry,
            accountProxy,
            accountImplementation
        );

        _saveImplementations(address(interopRelay), "InteropAccountRelay");
    }
}
