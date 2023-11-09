// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";

import {InteropAccount} from "../src/InteropAccount.sol";
import {InteropAccountRelay} from "../src/InteropAccountRelay.sol";
import {AccountItemConfiguration, InteropMainConfiguration} from "../src/lib/AccountItem.sol";

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

        InteropAccount(interopAccount).createMainAccount{value: 0.1 ether}(
            sender
        );
    }

    function _deployInterop(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        InteropMainConfiguration
            memory mainConfiguration = InteropMainConfiguration(
                "Gaian Wearable Pack",
                "GWP",
                "ipfs://bafkreifukc4gawybgl4736ltkwwoqoaxcl77r45yyf56u2qxu6xodutw2y",
                200,
                0.05 ether
            );

        AccountItemConfiguration[]
            memory deliverablesConfiguration = new AccountItemConfiguration[](
                1
            );

        deliverablesConfiguration[0] = AccountItemConfiguration(
            "Gaian Wearable - Carbon Black",
            "GWCB",
            "ipfs://bafkreicccfawsyoaxfkdaews5b4rlra7ivktnstbmrtowbthc2ewcg546e"
        );

        InteropAccount interopNFT = new InteropAccount(
            mainConfiguration,
            deliverablesConfiguration,
            registry,
            accountProxy,
            accountImplementation
        );

        _saveImplementations(address(interopNFT), "InteropAccount");
    }

    function _deployRelay(
        DeployementChain[] memory targetChains
    ) internal setEnvDeploy(Cycle.Testnet) broadcastOn(targetChains) {
        AccountItemConfiguration[]
            memory deliverablesConfiguration = new AccountItemConfiguration[](
                2
            );

        deliverablesConfiguration[0] = AccountItemConfiguration(
            "Gaian Wearable - Liquid Magma",
            "GWLM",
            "ipfs://bafkreieeahw2wicgul6t2gvgcsc4fottaeikhmw2zi73ipfvn7mlf3dbzy"
        );
        deliverablesConfiguration[1] = AccountItemConfiguration(
            "Gaian Wearable - Lunar White",
            "GWLW",
            "ipfs://bafkreieedy4laughaf3ebddmbad5bdjlryuw4jzcrj5ap726xw2cocqxo4"
        );

        InteropAccountRelay interopRelay = new InteropAccountRelay(
            deliverablesConfiguration,
            registry,
            accountProxy,
            accountImplementation
        );

        _saveImplementations(address(interopRelay), "InteropAccountRelay");
    }
}
