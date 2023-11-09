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
            "ipfs://bafkreic7ffaebtguduxnajwhrlkw3imxk4pcx7jj4gs6jkotqugp7trc7e"
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
            "ipfs://bafkreibyu5ite5igoy4g6lwtplfdwbh46bxe3dfr4qfx3uxy65b6psorn4"
        );
        deliverablesConfiguration[1] = AccountItemConfiguration(
            "Gaian Wearable - Lunar White",
            "GWLW",
            "ipfs://bafkreigv3vom74k3zapgmc7ishl5tq52xyd7dth7bhdkqbqdvecsabosda"
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
