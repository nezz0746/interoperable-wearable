// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC721A} from "ERC721A/ERC721A.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {AccountItemConfiguration} from "../lib/AccountItem.sol";

/**
 * @title ERC721AccountItem
 * @author nezzar.eth
 * @notice ERC721AccountItem is a non-transferable ERC721 token that can only
 * be minted by the owner.
 */
contract ERC721AccountItem is ERC721A, Ownable {
    string public itemURI;

    constructor(
        AccountItemConfiguration memory itemConfiuration
    ) ERC721A(itemConfiuration.name, itemConfiuration.symbol) {
        itemURI = itemConfiuration.uri;
    }

    function deliver(address to) external onlyOwner {
        _safeMint(to, 1, "");
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return itemURI;
    }

    function _beforeTokenTransfers(
        address from,
        address,
        uint256,
        uint256
    ) internal pure override {
        require(from == address(0), "ERC721AccountItem: non-transferable");
    }
}
