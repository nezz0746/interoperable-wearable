// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {DSTestFull} from "./helpers/DSTestFull.sol";
import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import {AccountV3} from "tokenbound/AccountV3.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";
import {AccountGuardian} from "tokenbound/AccountGuardian.sol";
import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Create2} from "openzeppelin-contracts/contracts/utils/Create2.sol";

contract MockERC721 is ERC721 {
    constructor() ERC721("MockERC721", "MockERC721") {}

    function mint(address to, uint256 tokenId) public {
        _mint(to, tokenId);
    }
}

contract AccountTest is DSTestFull {
    ERC6551Registry registry;
    AccountGuardian guardian;
    AccountV3 accountV3;

    enum DeployementChain {
        Mainnet,
        Polygon
    }
    mapping(DeployementChain => string forkId) public forks;

    uint256 fork1Id;
    uint256 fork2Id;

    function setUp() public {
        fork1Id = vm.createFork("mainnet");
        fork2Id = vm.createFork("polygon");
    }

    function testCreateAccount() public {}
}
