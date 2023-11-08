// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC721AccountItem} from "../tokens/ERC721AccountItem.sol";
import {AccountItemConfiguration} from "../lib/AccountItem.sol";

contract AccountItemDelivery {
    struct Deliverable {
        string uri;
        address contractAddress;
    }

    Deliverable[] public deliverables;

    constructor(AccountItemConfiguration[] memory derliverablesConfiguration) {
        for (uint256 i = 0; i < derliverablesConfiguration.length; i++) {
            deliverables.push(
                Deliverable({
                    uri: derliverablesConfiguration[i].uri,
                    contractAddress: address(
                        new ERC721AccountItem(derliverablesConfiguration[i])
                    )
                })
            );
        }
    }

    function getItems() external view returns (Deliverable[] memory) {
        return deliverables;
    }
}
