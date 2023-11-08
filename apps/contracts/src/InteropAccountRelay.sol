// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC6551AccountCreator} from "./extensions/ERC6551AccountCreator.sol";
import {AccountItemConfiguration} from "./lib/AccountItem.sol";
import {AccountItemDelivery} from "./extensions/AccountItemDelivery.sol";

contract InteropAccountRelay is ERC6551AccountCreator, AccountItemDelivery {
    event CreateSideAccount(address account);

    constructor(
        AccountItemConfiguration[] memory deliverablesConfiguration,
        address registry,
        address accountProxy,
        address implementation
    )
        ERC6551AccountCreator(registry, accountProxy, implementation)
        AccountItemDelivery(deliverablesConfiguration)
    {}

    function createAccount(
        uint256 chainId,
        address mainContract,
        uint256 tokenId
    ) public returns (address account) {
        account = _createAccount(chainId, mainContract, tokenId);

        _deliverItems(account);

        emit CreateSideAccount(account);
    }
}
