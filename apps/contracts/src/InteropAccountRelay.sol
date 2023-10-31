// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC6551AccountCreator} from "./extensions/ERC6551AccountCreator.sol";

contract InteropAccountRelay is ERC6551AccountCreator {
    event CreateSideAccount(address account);

    constructor(
        address registry,
        address accountProxy,
        address implementation
    ) ERC6551AccountCreator(registry, accountProxy, implementation) {}

    function createAccount(
        uint256 chainId,
        address mainContract,
        uint256 tokenId
    ) public {
        _createAccount(chainId, mainContract, tokenId);
    }
}
