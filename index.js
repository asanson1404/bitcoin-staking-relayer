import { ethers } from 'ethers';
import { verifySPVABI } from './ABI/verifySPV.js';
import { getParsedTxBlockHeader, getTxIndex, getTxMerkleProof } from './api.js';

const txHash = "762966186c40a0abd7eb39ff77f71f29281de0f4264e5c889cbdb25c04d06135";

async function makeApiCall() {
  await getParsedTxBlockHeader(txHash);
  await getTxIndex(txHash);
  await getTxMerkleProof(txHash);
}

makeApiCall(); 