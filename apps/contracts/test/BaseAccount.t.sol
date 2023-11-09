// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {console2} from "forge-std/Test.sol";
import {DSTestFull} from "./helpers/DSTestFull.sol";
import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import {AccountV3} from "tokenbound/AccountV3.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";
import {AccountGuardian} from "tokenbound/AccountGuardian.sol";
import {Multicall3} from "multicall-authenticated/Multicall3.sol";

contract BaseAccount is DSTestFull {
    ERC6551Registry registry;
    AccountProxy accountProxy;
    AccountGuardian guardian;
    Multicall3 forwarder;
    AccountV3 implementation;

    constructor() {
        registry = new ERC6551Registry();
        guardian = new AccountGuardian(address(this));
        forwarder = new Multicall3();
        implementation = new AccountV3(
            address(1),
            address(forwarder),
            address(registry),
            address(guardian)
        );

        accountProxy = new AccountProxy(
            address(guardian),
            address(implementation)
        );

        vm.makePersistent(address(registry));
        vm.makePersistent(address(accountProxy));
        vm.makePersistent(address(guardian));
        vm.makePersistent(address(forwarder));
        vm.makePersistent(address(implementation));
    }
}
