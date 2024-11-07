import axios from 'axios';
import { parseBlockHeader } from './utils.js';
import dotenv from 'dotenv';
dotenv.config();

const mempoolBaseUrl = process.env.MEMPOOL_BASE_URL;

export async function getParsedTxBlockHeader(txHash) {
    try {
        const tx = await axios.get(mempoolBaseUrl + '/tx/' + txHash);
        const blockHeader = await axios.get(mempoolBaseUrl + '/block/' + tx.data.status.block_hash + '/header');
        return parseBlockHeader(blockHeader.data);
    } catch (error) {
        console.error('API call failed:', error.message);
    }
}

export async function getTxIndex(txHash) {
    try {
        const tx = await axios.get(mempoolBaseUrl + '/tx/' + txHash);
        const txids = await axios.get(mempoolBaseUrl + '/block/' + tx.data.status.block_hash + '/txids');
        const txIndex = txids.data.indexOf(txHash);
        return txIndex;
    } catch (error) {
        console.error('API call failed:', error.message);
    }
}

export async function getTxMerkleProof(txHash) {
    try {
        const proof = await axios.get(mempoolBaseUrl + '/tx/' + txHash + '/merkle-proof');
        return proof.data.merkle;
    } catch (error) {
        console.error('API call failed:', error.message);
    }
}