import { getTxOutputs } from './api.js';

export function reverseBytes(hex) {
    return hex.match(/.{2}/g).reverse().join('');
}

export function parseBlockHeader(hexHeader) {
    
    const version = '0x' + reverseBytes(hexHeader.slice(0, 8));
    const previousBlockHash = '0x' + reverseBytes(hexHeader.slice(8, 72));
    const merkleRootHash = '0x' + reverseBytes(hexHeader.slice(72, 136));
    const timestamp = '0x' + reverseBytes(hexHeader.slice(136, 144));
    const nBits = '0x' + reverseBytes(hexHeader.slice(144, 152));
    const nonce = '0x' + reverseBytes(hexHeader.slice(152, 160));

    return {
        version: version,
        previousBlockHash: previousBlockHash,
        merkleRootHash: merkleRootHash,
        timestamp: timestamp,
        nBits: nBits,
        nonce: nonce
    };
}

export async function parseOpReturnData(txHash) {

    const txOutputs = await getTxOutputs(txHash);

    const stakeAmountSat = txOutputs[0].value;

    const opReturnOutput = txOutputs.find(output => output.scriptpubkey_type === 'op_return');
    if (!opReturnOutput) {
        throw new Error('No OP_RETURN output found');
    }
    const hexData = opReturnOutput.scriptpubkey.slice(4);
    console.log('Hex Data:', hexData);

    let offset = 0;
    
    // Tag (4 bytes)
    const tag = hexData.slice(offset, offset + 8);
    offset += 8;
    
    // Version (1 byte)
    const version = hexData.slice(offset, offset + 2);
    offset += 2;
    
    // StakerPublicKey (32 bytes)
    const stakerPublicKey = hexData.slice(offset, offset + 64);
    offset += 64;
    
    // FinalityProviderPublicKey (32 bytes)
    const finalityProviderPublicKey = hexData.slice(offset, offset + 64);
    offset += 64;
    
    // StakingTime (2 bytes)
    const stakingTime = hexData.slice(offset, offset + 4);
    
    return {
        tag: '0x' + tag,
        version: parseInt(version, 16),
        stakerPublicKey: '0x' + stakerPublicKey,
        finalityProviderPublicKey: '0x' + finalityProviderPublicKey,
        stakingTime: parseInt(stakingTime, 16),
        stakeAmountSat: stakeAmountSat
    };
}
