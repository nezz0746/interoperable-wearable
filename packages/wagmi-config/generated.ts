import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  Address,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

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
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
 */
export const interopAccountRelayABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'mainContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
 */
export const interopAccountRelayAddress = {
  80001: '0x107c7789dea397EFBCA24ccAfF41698baFd82A72',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
 */
export const interopAccountRelayConfig = {
  address: interopAccountRelayAddress,
  abi: interopAccountRelayABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
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
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
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
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
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
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
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
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link interopAccountRelayABI}__.
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
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
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x107c7789dea397EFBCA24ccAfF41698baFd82A72)
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
