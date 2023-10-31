// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "fx-portal/tunnel/FxBaseRootTunnel.sol";
import "fx-portal/tunnel/FxBaseChildTunnel.sol";

contract RootContract is FxBaseRootTunnel {
    event MessageFromChild(address sender, bytes data);

    string public messageFromChild;

    constructor(
        address _checkpointManager,
        address _fxRoot
    ) FxBaseRootTunnel(_checkpointManager, _fxRoot) {}

    function sendMessage(string memory message) public {
        _sendMessageToChild(abi.encode(message));
    }

    function _processMessageFromChild(bytes memory data) internal override {
        messageFromChild = abi.decode(data, (string));

        emit MessageFromChild(msg.sender, data);
    }
}

contract ChildContract is FxBaseChildTunnel {
    string public messageFromRoot;
    event MessageFromRoot(address sender, bytes data);

    constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {}

    function sendMessage(string memory message) public {
        _sendMessageToRoot(abi.encode(message));
    }

    function _processMessageFromRoot(
        uint256,
        address sender,
        bytes memory data
    ) internal override validateSender(sender) {
        messageFromRoot = abi.decode(data, (string));

        emit MessageFromRoot(msg.sender, data);
    }
}
