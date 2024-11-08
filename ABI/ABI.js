export const stratVaultABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_byzantineRelayerAddress",
        type: "address",
      },
      { internalType: "address", name: "_byzBTC", type: "address" },
      { internalType: "address", name: "_verifySPVAddr", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "LengthMismatch", type: "error" },
  { inputs: [], name: "OnlyByzantineRelayer", type: "error" },
  {
    inputs: [],
    name: "byzBTC",
    outputs: [{ internalType: "contract ByzBTC", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "byzantineRelayerAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "_avs", type: "address[]" }],
    name: "createBabylonStratVault",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "idToStratVault",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "merkleRootHash",
            type: "bytes32",
          },
          { internalType: "bytes4", name: "nBits", type: "bytes4" },
          { internalType: "bytes4", name: "nonce", type: "bytes4" },
          {
            internalType: "bytes32",
            name: "previousBlockHash",
            type: "bytes32",
          },
          { internalType: "bytes4", name: "timestamp", type: "bytes4" },
          { internalType: "bytes4", name: "version", type: "bytes4" },
        ],
        internalType: "struct BlockHeader[]",
        name: "blockSequence",
        type: "tuple[]",
      },
      { internalType: "uint256", name: "blockIndex", type: "uint256" },
      { internalType: "uint256", name: "txIndex", type: "uint256" },
      { internalType: "bytes32", name: "txHash", type: "bytes32" },
      { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
      { internalType: "address", name: "_staker", type: "address" },
      {
        internalType: "uint256",
        name: "_satoshiAmount",
        type: "uint256",
      },
      { internalType: "uint256", name: "_duration", type: "uint256" },
      { internalType: "address[]", name: "_avs", type: "address[]" },
      { internalType: "bool", name: "verifyTx", type: "bool" },
    ],
    name: "restakeInBabylonVault",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifySPV",
    outputs: [
      { internalType: "contract IVerifySPV", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
