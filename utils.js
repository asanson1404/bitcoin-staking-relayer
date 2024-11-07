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