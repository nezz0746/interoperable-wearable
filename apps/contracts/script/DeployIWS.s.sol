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
                "Interoperable Wearable Main Item",
                "IWS",
                "ipfs://bafkreihojjqpj3flh3buv6xfxbq5krnlbaoa4q2dj2muifylyzoa34olyi",
                500,
                0.1 ether
            );

        AccountItemConfiguration[]
            memory deliverablesConfiguration = new AccountItemConfiguration[](
                1
            );

        deliverablesConfiguration[0] = AccountItemConfiguration(
            "Interoperable Wearable Item",
            "IWI",
            "ipfs://bafkreif4ytood4qzd6ltlbc5u7j6abpp42cui5w2wmhasno3pkvzugtssm"
        );

        InteropAccount interopNFT = new InteropAccount(
            mainConfiguration,
            deliverablesConfiguration,
            registry,
            accountProxy,
            accountImplementation
        );

        interopNFT.setPrice(0.1 ether);

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
            "Interoperable Wearable Item",
            "IWI",
            "ipfs://bafkreia2gzeuzmyzzdcztnaccmc2kbc7ny535jvevk6op2rfrqdp7z5zsy"
        );
        deliverablesConfiguration[1] = AccountItemConfiguration(
            "Interoperable Wearable Item",
            "IWI",
            "ipfs://bafkreiabfd3hm7fjjwmfvyh7pt6ymrtgyyds7y57gtjeyvsc43ku77pnke"
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
