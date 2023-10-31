// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC6551Registry} from "erc6551/ERC6551Registry.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {AccountProxy} from "tokenbound/AccountProxy.sol";

import {IInteropNFTMain} from "./interfaces/IInteropNFTMain.sol";
import {ERC6551AccountCreator} from "./extensions/ERC6551AccountCreator.sol";
import {ERC721A} from "ERC721A/ERC721A.sol";

contract InteropAccountNFT is
    IInteropNFTMain,
    ERC721A,
    ERC6551AccountCreator,
    Ownable
{
    uint256 public immutable MAX_SUPPLY;

    uint256 public price;

    constructor(
        address registry,
        address accountProxy,
        address implementation,
        uint256 maxSupply
    )
        ERC721A("InteropNFTMain", "INFTM")
        ERC6551AccountCreator(registry, accountProxy, implementation)
    {
        MAX_SUPPLY = maxSupply;
    }

    /**
     * @notice Modifier to check if the sale is active.
     */
    modifier whenSaleActive() {
        require(price > 0, "Sale is not active");
        _;
    }

    /**
     * @notice Create a main account for the given recipient (via bound ERC721).
     * @dev This function mints a new token to be bound to the main account, then creates the account on the root chain.
     * Ensure that the maximum supply is not exceeded and the correct price is paid before minting.
     * @param recipient The address of the recipient who will receive the minted token.
     */
    function createMainAccount(
        address recipient
    ) public payable whenSaleActive {
        if (_totalMinted() >= MAX_SUPPLY) revert MaxSupplyReached();
        if (msg.value < price) revert PriceNotMet();

        uint256 tokenId = _nextTokenId();

        // Mint token to bind account to
        _safeMint(recipient, 1);

        // Create account on root chain
        _createAccount(block.chainid, address(this), tokenId);

        // Emit event for side chain to listen to and create account with the same chainId
        emit CreateMainAccount(block.chainid, address(this), tokenId);

        _refundExcess(payable(msg.sender), price);
    }

    /**
     * @notice Allows the owner to set the price of the NFT.
     */
    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
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
    ) private {
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
