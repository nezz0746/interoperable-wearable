// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC721A} from "ERC721A/ERC721A.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract ERC721Drop is ERC721A, Ownable {
    uint256 public immutable maxSupply;

    uint256 public price;

    event SetPrice(uint256 price);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _price,
        uint256 _maxSupply
    ) ERC721A(name, symbol) {
        price = _price;
        maxSupply = _maxSupply;
    }

    /**
     * @notice Modifier to check if the sale is active.
     */
    modifier whenSaleActive() {
        require(price > 0, "Sale is not active");
        _;
    }

    /**
     * @notice Allows the owner to set the price of the NFT.
     */
    function setPrice(uint256 _price) public onlyOwner {
        price = _price;

        emit SetPrice(_price);
    }

    /**
     * @notice Allows the owner to withdraw the contract's Ether balance.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;

        require(balance > 0, "No funds to withdraw");

        payable(owner()).transfer(balance);
    }

    /**
     * @dev Refunds excess Ether sent with the transaction.
     */
    function _refundExcess(
        address payable recipient,
        uint256 requiredAmount
    ) internal {
        uint256 excess = msg.value - requiredAmount;

        if (excess > 0) {
            recipient.transfer(excess);
        }
    }

    /**
     * @notice override the default implementation of _startTokenId
     */
    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }
}
