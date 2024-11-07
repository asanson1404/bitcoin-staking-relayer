export const verifySPVABI = [
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "bytes32",
                "name": "merkleRootHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "nBits", "type": "bytes4" },
            { "internalType": "bytes4", "name": "nonce", "type": "bytes4" },
            {
                "internalType": "bytes32",
                "name": "previousBlockHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "timestamp", "type": "bytes4" },
            { "internalType": "bytes4", "name": "version", "type": "bytes4" }
            ],
            "internalType": "struct BlockHeader",
            "name": "genesisHeader",
            "type": "tuple"
        },
        { "internalType": "uint256", "name": "height", "type": "uint256" },
        {
            "internalType": "uint256",
            "name": "_minimumConfidence",
            "type": "uint256"
        },
        { "internalType": "bool", "name": "_isTestnet", "type": "bool" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "blockHash",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "height",
            "type": "uint256"
        }
        ],
        "name": "BlockRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "LDEBlockHash",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LatestBlockHash",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "blockHashes",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "name": "blockHeaders",
        "outputs": [
        {
            "components": [
            {
                "internalType": "bytes32",
                "name": "merkleRootHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "nBits", "type": "bytes4" },
            { "internalType": "bytes4", "name": "nonce", "type": "bytes4" },
            {
                "internalType": "bytes32",
                "name": "previousBlockHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "timestamp", "type": "bytes4" },
            { "internalType": "bytes4", "name": "version", "type": "bytes4" }
            ],
            "internalType": "struct BlockHeader",
            "name": "header",
            "type": "tuple"
        },
        { "internalType": "uint256", "name": "confidence", "type": "uint256" },
        { "internalType": "uint256", "name": "height", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        { "internalType": "bytes32", "name": "blockHash", "type": "bytes32" }
        ],
        "name": "confidenceByHash",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        { "internalType": "uint256", "name": "height", "type": "uint256" }
        ],
        "name": "confidenceByHeight",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isTestnet",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minimumConfidence",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "bytes32",
                "name": "merkleRootHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "nBits", "type": "bytes4" },
            { "internalType": "bytes4", "name": "nonce", "type": "bytes4" },
            {
                "internalType": "bytes32",
                "name": "previousBlockHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "timestamp", "type": "bytes4" },
            { "internalType": "bytes4", "name": "version", "type": "bytes4" }
            ],
            "internalType": "struct BlockHeader[]",
            "name": "blockSequence",
            "type": "tuple[]"
        },
        { "internalType": "bytes", "name": "txHex", "type": "bytes" },
        { "internalType": "uint256", "name": "blockIndex", "type": "uint256" },
        { "internalType": "uint256", "name": "txIndex", "type": "uint256" },
        { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "parseAndVerifyTxInclusion",
        "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" },
        { "internalType": "bytes32", "name": "", "type": "bytes32" },
        {
            "components": [
            { "internalType": "bytes32", "name": "txid", "type": "bytes32" },
            { "internalType": "uint32", "name": "vout", "type": "uint32" }
            ],
            "internalType": "struct Prevout[]",
            "name": "",
            "type": "tuple[]"
        },
        {
            "components": [
            { "internalType": "bytes", "name": "spk", "type": "bytes" },
            { "internalType": "uint32", "name": "amount", "type": "uint32" }
            ],
            "internalType": "struct Outpoint[]",
            "name": "",
            "type": "tuple[]"
        }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "bytes32",
                "name": "merkleRootHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "nBits", "type": "bytes4" },
            { "internalType": "bytes4", "name": "nonce", "type": "bytes4" },
            {
                "internalType": "bytes32",
                "name": "previousBlockHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "timestamp", "type": "bytes4" },
            { "internalType": "bytes4", "name": "version", "type": "bytes4" }
            ],
            "internalType": "struct BlockHeader[]",
            "name": "blockSequence",
            "type": "tuple[]"
        },
        { "internalType": "uint256", "name": "blockIndex", "type": "uint256" }
        ],
        "name": "registerInclusiveBlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "bytes32",
                "name": "merkleRootHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "nBits", "type": "bytes4" },
            { "internalType": "bytes4", "name": "nonce", "type": "bytes4" },
            {
                "internalType": "bytes32",
                "name": "previousBlockHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "timestamp", "type": "bytes4" },
            { "internalType": "bytes4", "name": "version", "type": "bytes4" }
            ],
            "internalType": "struct BlockHeader[]",
            "name": "newEpoch",
            "type": "tuple[]"
        },
        { "internalType": "uint256", "name": "blockIndex", "type": "uint256" }
        ],
        "name": "registerLatestBlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
        {
            "components": [
            {
                "internalType": "bytes32",
                "name": "merkleRootHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "nBits", "type": "bytes4" },
            { "internalType": "bytes4", "name": "nonce", "type": "bytes4" },
            {
                "internalType": "bytes32",
                "name": "previousBlockHash",
                "type": "bytes32"
            },
            { "internalType": "bytes4", "name": "timestamp", "type": "bytes4" },
            { "internalType": "bytes4", "name": "version", "type": "bytes4" }
            ],
            "internalType": "struct BlockHeader[]",
            "name": "blockSequence",
            "type": "tuple[]"
        },
        { "internalType": "uint256", "name": "blockIndex", "type": "uint256" },
        { "internalType": "uint256", "name": "txIndex", "type": "uint256" },
        { "internalType": "bytes32", "name": "txHash", "type": "bytes32" },
        { "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }
        ],
        "name": "verifyTxInclusion",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
]
