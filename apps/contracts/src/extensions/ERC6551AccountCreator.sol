// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";

contract ERC6551AccountCreator {
    ERC6551Registry internal _registry;
    address internal _implementation;
    address internal _accountProxy;

    constructor(
        address registry,
        address accountProxy,
        address implementation
    ) {
        _registry = ERC6551Registry(registry);
        _accountProxy = accountProxy;
        _implementation = implementation;
    }

    function _createAccount(
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) internal returns (address accountAddress) {
        accountAddress = _registry.createAccount(
            _accountProxy,
            bytes32(""),
            chainId,
            tokenContract,
            tokenId
        );

        AccountProxy(payable(accountAddress)).initialize(_implementation);
    }
}
