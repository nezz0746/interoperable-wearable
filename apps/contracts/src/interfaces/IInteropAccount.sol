// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface IInteropAccount {
    event CreateMainAccount(
        uint256 indexed chainId,
        address indexed tokenContract,
        uint256 indexed tokenId
    );

    error MaxSupplyReached();
    error PriceNotMet();

    function createMainAccount(address recipient) external payable;
}
