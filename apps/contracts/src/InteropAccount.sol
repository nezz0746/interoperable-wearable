// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";

import {IInteropAccount} from "./interfaces/IInteropAccount.sol";
import {ERC6551AccountCreator} from "./extensions/ERC6551AccountCreator.sol";
import {ERC721Drop} from "./tokens/ERC721Drop.sol";
import {AccountItemConfiguration, InteropMainConfiguration} from "./lib/AccountItem.sol";
import {AccountItemDelivery} from "./extensions/AccountItemDelivery.sol";

contract InteropAccount is
    IInteropAccount,
    ERC721Drop,
    ERC6551AccountCreator,
    AccountItemDelivery
{
    constructor(
        InteropMainConfiguration memory mainConfiguration,
        AccountItemConfiguration[] memory deliverablesConfiguration,
        address registry,
        address accountProxy,
        address implementation
    )
        ERC721Drop(
            mainConfiguration.name,
            mainConfiguration.symbol,
            mainConfiguration.price,
            mainConfiguration.maxSupply,
            mainConfiguration.uri
        )
        ERC6551AccountCreator(registry, accountProxy, implementation)
        AccountItemDelivery(deliverablesConfiguration)
    {}

    /**
     * @notice Create a main account for the given recipient (via bound ERC721).
     * @dev This function mints a new token to be bound to the main account, then creates the account on the root chain.
     * Ensure that the maximum supply is not exceeded and the correct price is paid before minting.
     * @param recipient The address of the recipient who will receive the minted token.
     */
    function createMainAccount(
        address recipient
    ) public payable whenSaleActive {
        if (_totalMinted() >= maxSupply) revert MaxSupplyReached();
        if (msg.value < price) revert PriceNotMet();

        uint256 tokenId = _nextTokenId();

        // Mint token to bind account to
        _safeMint(recipient, 1);

        // Create account on root chain
        address account = _createAccount(block.chainid, address(this), tokenId);

        // Deliver items to account
        _deliverItems(account);

        // Emit event for side chain to listen to and create account with the same chainId
        emit CreateMainAccount(block.chainid, address(this), tokenId);

        _refundExcess(payable(msg.sender), price);
    }
}
