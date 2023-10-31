// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "fx-portal/tunnel/FxBaseRootTunnel.sol";
import "fx-portal/tunnel/FxBaseChildTunnel.sol";
import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";

import {IInteropNFTMain} from "./IInteropNFTMain.sol";

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

contract InteropNFTMain is
    IInteropNFTMain,
    ERC721,
    FxBaseRootTunnel,
    ERC6551AccountCreator,
    Ownable
{
    uint256 public MAX_SUPPLY;

    uint256 public PRICE;

    uint256 internal _currentTokenId = 1;

    constructor(
        address _checkpointManager,
        address _fxRoot,
        address registry,
        address accountProxy,
        address implementation,
        uint256 maxSupply,
        uint256 price
    )
        ERC721("InteropNFTMain", "INFTM")
        FxBaseRootTunnel(_checkpointManager, _fxRoot)
        ERC6551AccountCreator(registry, accountProxy, implementation)
    {
        _registry = ERC6551Registry(registry);
        _implementation = implementation;
        _accountProxy = accountProxy;
        MAX_SUPPLY = maxSupply;
        PRICE = price;
    }

    function createMainAccount(address recipient) public payable {
        if (_currentTokenId >= MAX_SUPPLY) revert MaxSupplyReached();
        if (msg.value < PRICE) revert PriceNotMet();

        uint256 tokenId = _currentTokenId;

        // Mint token to bind account to
        _safeMint(recipient, _currentTokenId);

        _currentTokenId++;

        // Create account on root chain
        _createAccount(block.chainid, address(this), tokenId);

        require(fxChildTunnel != address(0), "FxChildTunnel not set");

        // Send message though FX-Portal to create account on side chain
        _sendMessageToChild(
            abi.encodePacked(address(this), tokenId, block.chainid)
        );
    }

    function _processMessageFromChild(bytes memory data) internal override {
        // no-op
    }
}

contract InteropNFTSide is FxBaseChildTunnel, ERC6551AccountCreator {
    constructor(
        address _fxChild,
        address registry,
        address accountProxy,
        address implementation
    )
        FxBaseChildTunnel(_fxChild)
        ERC6551AccountCreator(registry, accountProxy, implementation)
    {
        _registry = ERC6551Registry(registry);
        _accountProxy = accountProxy;
        _implementation = implementation;
    }

    function _processMessageFromRoot(
        uint256, // stateId
        address sender,
        bytes memory data
    ) internal override validateSender(sender) {
        (address mainContract, uint256 tokenId, uint256 chainId) = abi.decode(
            data,
            (address, uint256, uint256)
        );

        _createAccount(chainId, mainContract, tokenId);
    }
}
