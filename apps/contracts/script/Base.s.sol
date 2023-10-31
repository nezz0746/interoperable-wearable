// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";

contract BaseScript is Script {
    // Project specific variables
    address goerliCheckpointManager =
        0x2890bA17EfE978480615e330ecB65333b880928e;
    address goerliFxRoot = 0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA;
    address mumbaiFxChild = 0xCf73231F28B7331BBe3124B907840A94851f9f11;

    address registry = 0x000000006551c19487814612e58FE06813775758;
    address accountProxy = 0x55266d75D1a14E4572138116aF39863Ed6596E7F;
    address accountImplementation = 0x41C8f39463A868d3A88af00cd0fe7102F30E44eC;
    uint256 maxSupply = 100;
    uint256 price = 0.1 ether;

    DeployementChain[] sideChains;
    DeployementChain[] mainChains;
    //

    enum Cycle {
        Local,
        Testnet,
        Mainnet
    }

    enum DeployementChain {
        Anvil,
        Goerli,
        Mainnet,
        Mumbai,
        Polygon
    }
    string internal mnemonic =
        "test test test test test test test test test test test junk";

    uint256 internal deployerPrivateKey;

    mapping(DeployementChain => string forkId) public forks;

    DeployementChain internal _currentChain;

    constructor() {
        forks[DeployementChain.Anvil] = "local";
        forks[DeployementChain.Goerli] = "goerli";
        forks[DeployementChain.Mainnet] = "mainnet";
        forks[DeployementChain.Mumbai] = "mumbai";
        forks[DeployementChain.Polygon] = "polygon";
    }

    modifier broadcastOn(DeployementChain[] memory targetChains) {
        for (uint256 i = 0; i < targetChains.length; i++) {
            vm.createSelectFork(forks[targetChains[i]]);
            console2.log("Broadcasting on chain: ", forks[targetChains[i]]);
            _currentChain = targetChains[i];
            vm.startBroadcast(deployerPrivateKey);
            _;
            vm.stopBroadcast();
            console2.log(
                "Broadcasting on chain: ",
                forks[targetChains[i]],
                " done"
            );
        }
    }

    modifier setEnvDeploy(Cycle cycle) {
        if (cycle == Cycle.Local) {
            (, deployerPrivateKey) = deriveRememberKey({
                mnemonic: mnemonic,
                index: 1
            });
        } else if (cycle == Cycle.Testnet) {
            deployerPrivateKey = vm.envUint("TESTNET_PK");
        } else if (cycle == Cycle.Mainnet) {
            deployerPrivateKey = vm.envUint("MAINNET_PK");
        }

        _;
    }

    function _saveImplementations(
        address contractAddress,
        string memory contractName
    ) internal {
        string memory objectName = "export";
        string memory json;

        string memory filePathWithEncodePacked = string(
            abi.encodePacked(
                "./deployments/",
                vm.toString(block.chainid),
                "/",
                contractName,
                ".json"
            )
        );

        json = vm.serializeAddress(objectName, "address", contractAddress);

        vm.writeFile(filePathWithEncodePacked, json);
    }

    function _setChainsTestnet() internal {
        sideChains = new DeployementChain[](1);
        sideChains[0] = DeployementChain.Mumbai;
        mainChains = new DeployementChain[](1);
        mainChains[0] = DeployementChain.Goerli;
    }
}
