import {
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  useContractRead,
  UseContractReadConfig,
  Address,
} from 'wagmi'
import {
  WriteContractMode,
  PrepareWriteContractResult,
  ReadContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccountProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accountProxyABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_guardian', internalType: 'address', type: 'address' },
      {
        name: '_initialImplementation',
        internalType: 'address',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'InvalidImplementation' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6551Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc6551RegistryABI = [
  { type: 'error', inputs: [], name: 'AccountCreationFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ERC6551AccountCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551RegistryABI = [
  { type: 'error', inputs: [], name: 'AccountCreationFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ERC6551AccountCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: 'account', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [{ name: 'account', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InteropAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export const interopAccountABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: 'mainConfiguration',
        internalType: 'struct InteropMainConfiguration',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'deliverablesConfiguration',
        internalType: 'struct AccountItemConfiguration[]',
        type: 'tuple[]',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
        ],
      },
      { name: 'registry', internalType: 'address', type: 'address' },
      { name: 'accountProxy', internalType: 'address', type: 'address' },
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'MaxSupplyReached' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'PriceNotMet' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'CreateMainAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SetPrice',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'createMainAccount',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deliverables',
    outputs: [
      { name: 'uri', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'dropBaseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getItems',
    outputs: [
      {
        name: '',
        internalType: 'struct AccountItemDelivery.Deliverable[]',
        type: 'tuple[]',
        components: [
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'contractAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'price',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_price', internalType: 'uint256', type: 'uint256' }],
    name: 'setPrice',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'newUri', internalType: 'string', type: 'string' },
    ],
    name: 'setUri',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_dropURI', internalType: 'string', type: 'string' }],
    name: 'setUri',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export const interopAccountAddress = {
  5: '0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export const interopAccountConfig = {
  address: interopAccountAddress,
  abi: interopAccountABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InteropAccountNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const interopAccountNftABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'registry', internalType: 'address', type: 'address' },
      { name: 'accountProxy', internalType: 'address', type: 'address' },
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'MaxSupplyReached' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'PriceNotMet' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'CreateMainAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'recipient', internalType: 'address', type: 'address' }],
    name: 'createMainAccount',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'maxSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'price',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_price', internalType: 'uint256', type: 'uint256' }],
    name: 'setPrice',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InteropAccountRelay
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export const interopAccountRelayABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      {
        name: 'deliverablesConfiguration',
        internalType: 'struct AccountItemConfiguration[]',
        type: 'tuple[]',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'uri', internalType: 'string', type: 'string' },
        ],
      },
      { name: 'registry', internalType: 'address', type: 'address' },
      { name: 'accountProxy', internalType: 'address', type: 'address' },
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'CreateSideAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'mainContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [{ name: 'account', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'deliverables',
    outputs: [
      { name: 'uri', internalType: 'string', type: 'string' },
      { name: 'contractAddress', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getItems',
    outputs: [
      {
        name: '',
        internalType: 'struct AccountItemDelivery.Deliverable[]',
        type: 'tuple[]',
        components: [
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'contractAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'newUri', internalType: 'string', type: 'string' },
    ],
    name: 'setUri',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export const interopAccountRelayAddress = {
  80001: '0xF1C402A24Df396f9293DEC3917CEF682f655eaBe',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export const interopAccountRelayConfig = {
  address: interopAccountRelayAddress,
  abi: interopAccountRelayABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountProxyABI}__.
 */
export function useAccountProxyWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountProxyABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof accountProxyABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof accountProxyABI, TFunctionName, TMode>({
    abi: accountProxyABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountProxyABI}__ and `functionName` set to `"initialize"`.
 */
export function useAccountProxyInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountProxyABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof accountProxyABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof accountProxyABI, 'initialize', TMode>({
    abi: accountProxyABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountProxyABI}__.
 */
export function usePrepareAccountProxyWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountProxyABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountProxyABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountProxyABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountProxyABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareAccountProxyInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountProxyABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountProxyABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountProxyABI, 'initialize'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__.
 */
export function useAccountProxyEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useAccountProxyAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useAccountProxyBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useAccountProxyUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551RegistryABI}__.
 */
export function useErc6551RegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551RegistryABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551RegistryABI}__ and `functionName` set to `"account"`.
 */
export function useErc6551RegistryAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof erc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551RegistryABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551RegistryABI}__.
 */
export function useErc6551RegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551RegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof erc6551RegistryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc6551RegistryABI, TFunctionName, TMode>({
    abi: erc6551RegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function useErc6551RegistryCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551RegistryABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<
        typeof erc6551RegistryABI,
        'createAccount',
        TMode
      > & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof erc6551RegistryABI, 'createAccount', TMode>({
    abi: erc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551RegistryABI}__.
 */
export function usePrepareErc6551RegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551RegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551RegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6551RegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePrepareErc6551RegistryCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551RegistryABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc6551RegistryABI,
    'createAccount'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6551RegistryABI}__.
 */
export function useErc6551RegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc6551RegistryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc6551RegistryABI,
    ...config,
  } as UseContractEventConfig<typeof erc6551RegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6551RegistryABI}__ and `eventName` set to `"ERC6551AccountCreated"`.
 */
export function useErc6551RegistryErc6551AccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc6551RegistryABI, 'ERC6551AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc6551RegistryABI,
    eventName: 'ERC6551AccountCreated',
    ...config,
  } as UseContractEventConfig<
    typeof erc6551RegistryABI,
    'ERC6551AccountCreated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551RegistryABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"account"`.
 */
export function useIerc6551RegistryAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof ierc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551RegistryABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551RegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc6551RegistryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551RegistryABI, TFunctionName, TMode>({
    abi: ierc6551RegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function useIerc6551RegistryCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551RegistryABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<
        typeof ierc6551RegistryABI,
        'createAccount',
        TMode
      > & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551RegistryABI, 'createAccount', TMode>({
    abi: ierc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function usePrepareIerc6551RegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551RegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePrepareIerc6551RegistryCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc6551RegistryABI,
    'createAccount'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc6551RegistryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc6551RegistryABI,
    ...config,
  } as UseContractEventConfig<typeof ierc6551RegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `eventName` set to `"ERC6551AccountCreated"`.
 */
export function useIerc6551RegistryErc6551AccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc6551RegistryABI, 'ERC6551AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc6551RegistryABI,
    eventName: 'ERC6551AccountCreated',
    ...config,
  } as UseContractEventConfig<
    typeof ierc6551RegistryABI,
    'ERC6551AccountCreated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"deliverables"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountDeliverables<
  TFunctionName extends 'deliverables',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'deliverables',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"dropBaseURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountDropBaseUri<
  TFunctionName extends 'dropBaseURI',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'dropBaseURI',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"getItems"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountGetItems<
  TFunctionName extends 'getItems',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'getItems',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"maxSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountMaxSupply<
  TFunctionName extends 'maxSupply',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'maxSupply',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"price"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountPrice<
  TFunctionName extends 'price',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'price',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof interopAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof interopAccountABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof interopAccountABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, TFunctionName, TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof interopAccountABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'approve', TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"createMainAccount"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountCreateMainAccount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'createMainAccount'
        >['request']['abi'],
        'createMainAccount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'createMainAccount'
      }
    : UseContractWriteConfig<
        typeof interopAccountABI,
        'createMainAccount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'createMainAccount'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'createMainAccount', TMode>(
    {
      abi: interopAccountABI,
      address: interopAccountAddress[5],
      functionName: 'createMainAccount',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof interopAccountABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'renounceOwnership', TMode>(
    {
      abi: interopAccountABI,
      address: interopAccountAddress[5],
      functionName: 'renounceOwnership',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<
        typeof interopAccountABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'safeTransferFrom', TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<
        typeof interopAccountABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'setApprovalForAll', TMode>(
    {
      abi: interopAccountABI,
      address: interopAccountAddress[5],
      functionName: 'setApprovalForAll',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"setPrice"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSetPrice<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'setPrice'
        >['request']['abi'],
        'setPrice',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setPrice' }
    : UseContractWriteConfig<typeof interopAccountABI, 'setPrice', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPrice'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'setPrice', TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'setPrice',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"setUri"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSetUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'setUri'
        >['request']['abi'],
        'setUri',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setUri' }
    : UseContractWriteConfig<typeof interopAccountABI, 'setUri', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setUri'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'setUri', TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'setUri',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<
        typeof interopAccountABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'transferFrom', TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof interopAccountABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'transferOwnership', TMode>(
    {
      abi: interopAccountABI,
      address: interopAccountAddress[5],
      functionName: 'transferOwnership',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof interopAccountABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountABI, 'withdraw', TMode>({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"createMainAccount"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountCreateMainAccount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountABI,
      'createMainAccount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'createMainAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountABI,
    'createMainAccount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountABI,
      'renounceOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountABI,
      'setApprovalForAll'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"setPrice"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountSetPrice(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, 'setPrice'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'setPrice',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountABI, 'setPrice'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"setUri"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountSetUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, 'setUri'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'setUri',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountABI, 'setUri'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountABI,
      'transferOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function usePrepareInteropAccountWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"ConsecutiveTransfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountConsecutiveTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'ConsecutiveTransfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'ConsecutiveTransfer',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'ConsecutiveTransfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"CreateMainAccount"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountCreateMainAccountEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'CreateMainAccount'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'CreateMainAccount',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'CreateMainAccount'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"SetPrice"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountSetPriceEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'SetPrice'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'SetPrice',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'SetPrice'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xe75E1eCF502c58269e247aCB41D98F28c28dbe8E)
 */
export function useInteropAccountTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountABI,
    address: interopAccountAddress[5],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof interopAccountABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__.
 */
export function useInteropAccountNftRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useInteropAccountNftBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"getApproved"`.
 */
export function useInteropAccountNftGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useInteropAccountNftIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"maxSupply"`.
 */
export function useInteropAccountNftMaxSupply<
  TFunctionName extends 'maxSupply',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'maxSupply',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"name"`.
 */
export function useInteropAccountNftName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"owner"`.
 */
export function useInteropAccountNftOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useInteropAccountNftOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"price"`.
 */
export function useInteropAccountNftPrice<
  TFunctionName extends 'price',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'price',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useInteropAccountNftSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"symbol"`.
 */
export function useInteropAccountNftSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useInteropAccountNftTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useInteropAccountNftTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof interopAccountNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountNftABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: interopAccountNftABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountNftABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__.
 */
export function useInteropAccountNftWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountNftABI, TFunctionName, TMode>({
    abi: interopAccountNftABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"approve"`.
 */
export function useInteropAccountNftApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof interopAccountNftABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountNftABI, 'approve', TMode>({
    abi: interopAccountNftABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"createMainAccount"`.
 */
export function useInteropAccountNftCreateMainAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'createMainAccount'
        >['request']['abi'],
        'createMainAccount',
        TMode
      > & { functionName?: 'createMainAccount' }
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        'createMainAccount',
        TMode
      > & {
        abi?: never
        functionName?: 'createMainAccount'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountNftABI,
    'createMainAccount',
    TMode
  >({
    abi: interopAccountNftABI,
    functionName: 'createMainAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useInteropAccountNftRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountNftABI,
    'renounceOwnership',
    TMode
  >({
    abi: interopAccountNftABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useInteropAccountNftSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountNftABI,
    'safeTransferFrom',
    TMode
  >({
    abi: interopAccountNftABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useInteropAccountNftSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountNftABI,
    'setApprovalForAll',
    TMode
  >({
    abi: interopAccountNftABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"setPrice"`.
 */
export function useInteropAccountNftSetPrice<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'setPrice'
        >['request']['abi'],
        'setPrice',
        TMode
      > & { functionName?: 'setPrice' }
    : UseContractWriteConfig<typeof interopAccountNftABI, 'setPrice', TMode> & {
        abi?: never
        functionName?: 'setPrice'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountNftABI, 'setPrice', TMode>({
    abi: interopAccountNftABI,
    functionName: 'setPrice',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useInteropAccountNftTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountNftABI, 'transferFrom', TMode>({
    abi: interopAccountNftABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useInteropAccountNftTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof interopAccountNftABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountNftABI,
    'transferOwnership',
    TMode
  >({
    abi: interopAccountNftABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"withdraw"`.
 */
export function useInteropAccountNftWithdraw<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountNftABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof interopAccountNftABI, 'withdraw', TMode> & {
        abi?: never
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountNftABI, 'withdraw', TMode>({
    abi: interopAccountNftABI,
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__.
 */
export function usePrepareInteropAccountNftWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountNftABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareInteropAccountNftApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"createMainAccount"`.
 */
export function usePrepareInteropAccountNftCreateMainAccount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountNftABI,
      'createMainAccount'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'createMainAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    'createMainAccount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareInteropAccountNftRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountNftABI,
      'renounceOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareInteropAccountNftSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountNftABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareInteropAccountNftSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountNftABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"setPrice"`.
 */
export function usePrepareInteropAccountNftSetPrice(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'setPrice'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'setPrice',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'setPrice'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareInteropAccountNftTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareInteropAccountNftTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountNftABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountNftABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountNftABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePrepareInteropAccountNftWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'withdraw'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountNftABI,
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountNftABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__.
 */
export function useInteropAccountNftEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    ...config,
  } as UseContractEventConfig<typeof interopAccountNftABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__ and `eventName` set to `"Approval"`.
 */
export function useInteropAccountNftApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof interopAccountNftABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useInteropAccountNftApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof interopAccountNftABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__ and `eventName` set to `"ConsecutiveTransfer"`.
 */
export function useInteropAccountNftConsecutiveTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, 'ConsecutiveTransfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    eventName: 'ConsecutiveTransfer',
    ...config,
  } as UseContractEventConfig<
    typeof interopAccountNftABI,
    'ConsecutiveTransfer'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__ and `eventName` set to `"CreateMainAccount"`.
 */
export function useInteropAccountNftCreateMainAccountEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, 'CreateMainAccount'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    eventName: 'CreateMainAccount',
    ...config,
  } as UseContractEventConfig<typeof interopAccountNftABI, 'CreateMainAccount'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useInteropAccountNftOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof interopAccountNftABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountNftABI}__ and `eventName` set to `"Transfer"`.
 */
export function useInteropAccountNftTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountNftABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: interopAccountNftABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof interopAccountNftABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof interopAccountRelayABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountRelayABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountRelayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"deliverables"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayDeliverables<
  TFunctionName extends 'deliverables',
  TSelectData = ReadContractResult<
    typeof interopAccountRelayABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountRelayABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'deliverables',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountRelayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"getItems"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayGetItems<
  TFunctionName extends 'getItems',
  TSelectData = ReadContractResult<
    typeof interopAccountRelayABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountRelayABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'getItems',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountRelayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<
    typeof interopAccountRelayABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof interopAccountRelayABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractRead({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof interopAccountRelayABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountRelayAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountRelayABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof interopAccountRelayABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountRelayABI, TFunctionName, TMode>({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"createAccount"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayCreateAccount<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountRelayAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountRelayABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'createAccount'
      }
    : UseContractWriteConfig<
        typeof interopAccountRelayABI,
        'createAccount',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountRelayABI,
    'createAccount',
    TMode
  >({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountRelayAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountRelayABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof interopAccountRelayABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountRelayABI,
    'renounceOwnership',
    TMode
  >({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"setUri"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelaySetUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountRelayAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountRelayABI,
          'setUri'
        >['request']['abi'],
        'setUri',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setUri' }
    : UseContractWriteConfig<typeof interopAccountRelayABI, 'setUri', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setUri'
      } = {} as any,
) {
  return useContractWrite<typeof interopAccountRelayABI, 'setUri', TMode>({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'setUri',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof interopAccountRelayAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof interopAccountRelayABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof interopAccountRelayABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof interopAccountRelayABI,
    'transferOwnership',
    TMode
  >({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function usePrepareInteropAccountRelayWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountRelayABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountRelayABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"createAccount"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function usePrepareInteropAccountRelayCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountRelayABI,
      'createAccount'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountRelayABI,
    'createAccount'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function usePrepareInteropAccountRelayRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountRelayABI,
      'renounceOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountRelayABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"setUri"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function usePrepareInteropAccountRelaySetUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof interopAccountRelayABI, 'setUri'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'setUri',
    ...config,
  } as UsePrepareContractWriteConfig<typeof interopAccountRelayABI, 'setUri'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function usePrepareInteropAccountRelayTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof interopAccountRelayABI,
      'transferOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof interopAccountRelayABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof interopAccountRelayABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    ...config,
  } as UseContractEventConfig<typeof interopAccountRelayABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountRelayABI}__ and `eventName` set to `"CreateSideAccount"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayCreateSideAccountEvent(
  config: Omit<
    UseContractEventConfig<typeof interopAccountRelayABI, 'CreateSideAccount'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    eventName: 'CreateSideAccount',
    ...config,
  } as UseContractEventConfig<
    typeof interopAccountRelayABI,
    'CreateSideAccount'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountRelayABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF1C402A24Df396f9293DEC3917CEF682f655eaBe)
 */
export function useInteropAccountRelayOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<
      typeof interopAccountRelayABI,
      'OwnershipTransferred'
    >,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof interopAccountRelayAddress } = {} as any,
) {
  return useContractEvent({
    abi: interopAccountRelayABI,
    address: interopAccountRelayAddress[80001],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof interopAccountRelayABI,
    'OwnershipTransferred'
  >)
}
