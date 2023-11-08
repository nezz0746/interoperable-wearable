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
import {Multicall3} from "multicall-authenticated/Multicall3.sol";

import {InteropAccountRelay} from "../src/InteropAccountRelay.sol";
import {AccountItemConfiguration} from "../src/lib/AccountItem.sol";
import {ERC721AccountItem} from "../src/tokens/ERC721AccountItem.sol";

contract MockERC721 is ERC721 {
    constructor() ERC721("MockERC721", "MockERC721") {}

    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}

contract AccountTest is DSTestFull {
    ERC6551Registry registry;
    AccountProxy accountProxy;
    AccountGuardian guardian;
    Multicall3 forwarder;
    AccountV3 implementation;
    InteropAccountRelay interopAccountRelay;

    function setUp() public {
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

        AccountItemConfiguration[]
            memory itemConfiguration = new AccountItemConfiguration[](1);

        itemConfiguration[0] = AccountItemConfiguration(
            "MockERC721",
            "MockERC721",
            "https://example.com/{id}.json"
        );

        interopAccountRelay = new InteropAccountRelay(
            itemConfiguration,
            address(registry),
            address(accountProxy),
            address(implementation)
        );
    }

    function testRelayDeplyment() public {
        (, address itemAddress) = interopAccountRelay.deliverables(0);

        ERC721AccountItem item = ERC721AccountItem(itemAddress);

        assertEq(item.name(), "MockERC721");
        assertEq(item.symbol(), "MockERC721");
        assertEq(item.tokenURI(5), "https://example.com/{id}.json");
    }

    function testNonTransferability() public {
        address user = label("user");
        address user2 = label("user2");

        MockERC721 mockTokenbound = new MockERC721();

        mockTokenbound.mint(user, 1);

        address userAccount = interopAccountRelay.createAccount(
            block.chainid,
            address(mockTokenbound),
            1
        );

        (, address itemAddress) = interopAccountRelay.deliverables(0);

        ERC721AccountItem item = ERC721AccountItem(itemAddress);

        assertEq(item.name(), "MockERC721");

        vm.prank(user);
        vm.expectRevert("ERC721AccountItem: non-transferable");
        AccountV3(payable(userAccount)).execute(
            address(item),
            0,
            abi.encodeWithSelector(
                item.transferFrom.selector,
                userAccount,
                user2,
                0
            ),
            0
        );
    }
}
