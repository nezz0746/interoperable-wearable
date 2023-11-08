// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

struct InteropMainConfiguration {
    // The name of the main.
    string name;
    // The symbol of the main.
    string symbol;
    // The URI of the main.
    string uri;
    // The maximum supply of the main.
    uint256 maxSupply;
    // The price of the main.
    uint256 price;
}

struct AccountItemConfiguration {
    // The name of the item.
    string name;
    // The symbol of the item.
    string symbol;
    // The URI of the item.
    string uri;
}
