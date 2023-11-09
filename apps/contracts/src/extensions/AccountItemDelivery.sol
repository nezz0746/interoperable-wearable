// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC721AccountItem} from "../tokens/ERC721AccountItem.sol";
import {AccountItemConfiguration} from "../lib/AccountItem.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract AccountItemDelivery is Ownable {
    struct Deliverable {
        string uri;
        address contractAddress;
    }

    Deliverable[] public deliverables;

    constructor(AccountItemConfiguration[] memory derliverablesConfiguration) {
        for (uint256 i = 0; i < derliverablesConfiguration.length; i++) {
            ERC721AccountItem item = new ERC721AccountItem(
                derliverablesConfiguration[i]
            );

            deliverables.push(
                Deliverable({
                    contractAddress: address(item),
                    uri: item.tokenURI(0)
                })
            );
        }
    }

    function setUri(uint256 index, string memory newUri) external onlyOwner {
        ERC721AccountItem(deliverables[index].contractAddress).setUri(newUri);
    }

    function getItems() external view returns (Deliverable[] memory) {
        Deliverable[] memory items = new Deliverable[](deliverables.length);

        for (uint256 i = 0; i < deliverables.length; i++) {
            items[i] = Deliverable({
                contractAddress: deliverables[i].contractAddress,
                uri: ERC721AccountItem(deliverables[i].contractAddress)
                    .tokenURI(0)
            });
        }

        return items;
    }

    function _deliverItems(address recipient) internal {
        for (uint256 i = 0; i < deliverables.length; i++) {
            ERC721AccountItem(deliverables[i].contractAddress).deliver(
                recipient
            );
        }
    }
}
