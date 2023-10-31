// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";

import {IInteropNFTMain} from "./interfaces/IInteropNFTMain.sol";
import {ERC6551AccountCreator} from "./extensions/ERC6551AccountCreator.sol";

contract InteropAccountNFT is
    IInteropNFTMain,
    ERC721,
    ERC6551AccountCreator,
    Ownable
{
    uint256 public MAX_SUPPLY;

    uint256 public PRICE;

    uint256 internal _currentTokenId = 1;

    constructor(
        address registry,
        address accountProxy,
        address implementation,
        uint256 maxSupply,
        uint256 price
    )
        ERC721("InteropNFTMain", "INFTM")
        ERC6551AccountCreator(registry, accountProxy, implementation)
    {
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

        emit CreateMainAccount(block.chainid, address(this), tokenId);
    }
}
