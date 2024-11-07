import { ethers } from 'ethers';
import { verifySPVABI } from './ABI/verifySPV.js';
import { getParsedTxBlockHeader, getTxIndex, getTxMerkleProof } from './api.js';
import dotenv from 'dotenv';
dotenv.config();

const txHash = "68156d578d8faa5e1386184f7e4dd1be421dafd4563889a78817137f96877e13";

// Connecting to ethereum
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

async function verifyBitcoinTx(txHash) {
    // SPV contract address
    const spvContract = new ethers.Contract(process.env.SPV_ADDR_SEPOLIA, verifySPVABI, signer);

    const {
        version,
        previousBlockHash,
        merkleRootHash,
        timestamp,
        nBits,
        nonce
    } = await getParsedTxBlockHeader(txHash);

    // console.log('Version:', version);
    // console.log('Previous Block Hash:', previousBlockHash);
    // console.log('Merkle Root Hash:', merkleRootHash); 
    // console.log('Timestamp:', timestamp);
    // console.log('nBits:', nBits);
    // console.log('Nonce:', nonce);

    const blockSequence = [{
        merkleRootHash: merkleRootHash,
        nBits: nBits,
        nonce: nonce,
        previousBlockHash: previousBlockHash,
        timestamp: timestamp,
        version: version
    }];
    console.log('Block Sequence:', blockSequence);

    const blockIndex = 0;
    const txIndex = await getTxIndex(txHash);
    console.log('Block Index:', txIndex);

    const merkleProof = await getTxMerkleProof(txHash);
    console.log('Merkle Proof:', merkleProof);

    try {
        const returnValue = await spvContract.verifyTxInclusion.staticCall(
            blockSequence,
            blockIndex,
            txIndex,
            "0x" + txHash,
            merkleProof
        );
        console.log("Valeur retournée:", returnValue.toString());
    } catch (error) {
        console.error("Erreur lors de la transaction:", error.message);
    }

    // // Execute the transaction
    // const tx = await vaultContract.activateCluster(
    //   ethers.hexlify(pubKey),
    //   ethers.hexlify(signature),
    //   "0x" + depositDataRoot,
    //   clusterId
    // );
    // await tx.wait();
    // console.log("Beacon deposit transaction is successful: ", tx.hash);

}

async function makeApiCall() {
  await getParsedTxBlockHeader(txHash);
  await getTxIndex(txHash);
  await getTxMerkleProof(txHash);
}

// makeApiCall(); 
await verifyBitcoinTx(txHash);