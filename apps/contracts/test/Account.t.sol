// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {console2} from "forge-std/Test.sol";
import {BaseAccount} from "./BaseAccount.t.sol";
import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import {AccountV3} from "tokenbound/AccountV3.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";
import {AccountGuardian} from "tokenbound/AccountGuardian.sol";
import {ERC721} from "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Create2} from "openzeppelin-contracts/contracts/utils/Create2.sol";
import {Multicall3} from "multicall-authenticated/Multicall3.sol";

import {InteropAccountRelay} from "../src/InteropAccountRelay.sol";
import {InteropAccount} from "../src/InteropAccount.sol";
import {AccountItemConfiguration, InteropMainConfiguration} from "../src/lib/AccountItem.sol";
import {ERC721AccountItem} from "../src/tokens/ERC721AccountItem.sol";
import {AccountItemDelivery} from "../src/extensions/AccountItemDelivery.sol";
import {ERC6551AccountCreator} from "../src/extensions/ERC6551AccountCreator.sol";

contract MockERC721 is ERC721 {
    constructor() ERC721("MockERC721", "MockERC721") {}

    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}

contract MockDeliverable is ERC721AccountItem {
    constructor(
        AccountItemConfiguration memory itemConfiuration
    ) ERC721AccountItem(itemConfiuration) {}
}

contract MockAccountCreator is ERC6551AccountCreator {
    constructor(
        address registry,
        address accountProxy,
        address implementation
    ) ERC6551AccountCreator(registry, accountProxy, implementation) {}

    function createAccount(
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) public returns (address account) {
        account = _createAccount(chainId, tokenContract, tokenId);
    }
}

contract AccountTest is BaseAccount {
    InteropAccount interopAccount;
    address deployer = label("deployer");
    InteropAccountRelay interopAccountRelay;
    uint256 goerliForkId = vm.createFork("goerli");
    uint256 mumbaiForkId = vm.createFork("mumbai");

    function setUp() public {
        AccountItemConfiguration[]
            memory itemConfiguration = new AccountItemConfiguration[](3);

        itemConfiguration[0] = AccountItemConfiguration(
            "MockERC721",
            "MockERC721",
            "https://example.com/{id}.json"
        );
        itemConfiguration[1] = AccountItemConfiguration(
            "MockERC721",
            "MockERC721",
            "https://example.com/{id}.json"
        );
        itemConfiguration[2] = AccountItemConfiguration(
            "MockERC721",
            "MockERC721",
            "https://example.com/{id}.json"
        );

        vm.selectFork(mumbaiForkId);
        vm.prank(deployer);
        interopAccountRelay = new InteropAccountRelay(
            itemConfiguration,
            address(registry),
            address(accountProxy),
            address(implementation)
        );
        vm.makePersistent(address(interopAccountRelay));
    }

    function testOnlyDeployerCanSetUriOnInteropAccountRelay() public {
        vm.selectFork(mumbaiForkId);
        vm.prank(label("user"));
        vm.expectRevert("Ownable: caller is not the owner");
        interopAccountRelay.setUri(0, "https://example.com/{id}.json");

        vm.prank(deployer);
        interopAccountRelay.setUri(0, "https://example.com/{id}.json");
    }

    function testRelayDeplyment() public {
        (, address itemAddress) = interopAccountRelay.deliverables(0);

        ERC721AccountItem item = ERC721AccountItem(itemAddress);

        assertEq(item.name(), "MockERC721");
        assertEq(item.symbol(), "MockERC721");
        assertEq(item.tokenURI(5), "https://example.com/{id}.json");
    }

    function testNonTransferability() public {
        address crossChainExecutor = label("crossChainExecutor");
        address relayer = label("relayer");
        address user = label("user");
        address user2 = label("user2");

        vm.selectFork(goerliForkId);

        uint256 originalChainId = block.chainid;

        MockERC721 mockTokenbound = new MockERC721();

        mockTokenbound.mint(user, 1);

        vm.selectFork(mumbaiForkId);

        vm.prank(relayer);
        address userAccount = interopAccountRelay.createAccount(
            originalChainId,
            address(mockTokenbound),
            1
        );

        (, address itemAddress) = interopAccountRelay.deliverables(0);

        ERC721AccountItem item = ERC721AccountItem(itemAddress);

        assertEq(item.name(), "MockERC721");

        guardian.setTrustedExecutor(crossChainExecutor, true);

        vm.prank(crossChainExecutor);
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

contract InteropAccountTest is BaseAccount {
    InteropAccount interopAccount;
    address deployer = label("deployer");
    address minter = label("minter");

    function setUp() public {
        AccountItemConfiguration[]
            memory itemConfiguration = new AccountItemConfiguration[](1);

        itemConfiguration[0] = AccountItemConfiguration(
            "MockERC721",
            "MockERC721",
            "https://example.com/{id}.json"
        );

        vm.prank(deployer);
        interopAccount = new InteropAccount(
            InteropMainConfiguration({
                name: "MockERC721",
                symbol: "MockERC721",
                uri: "https://gaian.com/metadata/",
                maxSupply: 100,
                price: 0.1 ether
            }),
            itemConfiguration,
            address(registry),
            address(accountProxy),
            address(implementation)
        );
    }

    function testBaseURI() public {
        vm.deal(minter, 2 ether);

        vm.prank(minter);
        interopAccount.createMainAccount{value: 0.1 ether}(minter);

        assertEq(interopAccount.tokenURI(1), "https://gaian.com/metadata/1");
    }

    function testOnlyOwnerCanSetUri() public {
        vm.prank(label("user"));
        vm.expectRevert("Ownable: caller is not the owner");
        interopAccount.setUri("https://example.com/{id}.json");

        vm.prank(deployer);
        interopAccount.setUri("https://example.com/{id}.json");
    }
}

contract GasTests is BaseAccount {
    MockERC721 mockTokenbound;
    MockAccountCreator creator;
    MockDeliverable mockDeliverable;
    address user = label("user");

    function setUp() public {
        mockTokenbound = new MockERC721();

        mockTokenbound.mint(user, 1);

        creator = new MockAccountCreator(
            address(registry),
            address(accountProxy),
            address(implementation)
        );

        AccountItemConfiguration
            memory itemConfiguration = AccountItemConfiguration(
                "MockERC721",
                "MockERC721",
                "https://example.com/{id}.json"
            );

        mockDeliverable = new MockDeliverable(itemConfiguration);
    }

    function testGasUsageDelivery() public {
        mockDeliverable.deliver(user);
    }

    function testGasUsageAccountCreation() public {
        vm.prank(user);
        creator.createAccount(block.chainid, address(mockTokenbound), 1);
    }
}
