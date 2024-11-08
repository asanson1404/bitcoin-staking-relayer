import { ethers } from "ethers";
import { verifySPVABI } from "./ABI/verifySPV.js";
import { getParsedTxBlockHeader, getTxIndex, getTxMerkleProof } from "./api.js";
import { parseOpReturnData } from "./utils.js";
import { supabase } from "./supabaseClient.js";
import { stratVaultABI } from "./ABI/ABI.js";
import dotenv from "dotenv";
dotenv.config();

// Connecting to ethereum
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);

async function verifyBitcoinTx(txHash, address_receiver, avs_symbiotic) {
  // SPV contract address
  const vaultManagerContract = new ethers.Contract(
    process.env.STRATEGY_VAULT_ADDR,
    stratVaultABI,
    signer
  );

  const {
    version,
    previousBlockHash,
    merkleRootHash,
    timestamp,
    nBits,
    nonce,
  } = await getParsedTxBlockHeader(txHash);
  // console.log('Version:', version);
  // console.log('Previous Block Hash:', previousBlockHash);
  // console.log('Merkle Root Hash:', merkleRootHash);
  // console.log('Timestamp:', timestamp);
  // console.log('nBits:', nBits);
  // console.log('Nonce:', nonce);

  const {
    tag,
    stakerPublicKey,
    finalityProviderPublicKey,
    stakingTime,
    stakeAmountSat,
  } = await parseOpReturnData(txHash);
  //   console.log("Tag:", tag);
  //   console.log("Staker Public Key:", stakerPublicKey);
  //   console.log("Finality Provider Public Key:", finalityProviderPublicKey);
  //   console.log("Staking Time:", stakingTime);
  //   console.log("Stake Amount (satoshis):", stakeAmountSat);

  const blockSequence = [
    {
      merkleRootHash: merkleRootHash,
      nBits: nBits,
      nonce: nonce,
      previousBlockHash: previousBlockHash,
      timestamp: timestamp,
      version: version,
    },
  ];
  // console.log('Block Sequence:', blockSequence);

  const blockIndex = 0;
  const txIndex = await getTxIndex(txHash);
  // console.log('Block Index:', txIndex);

  const merkleProof = await getTxMerkleProof(txHash);
  // console.log('Merkle Proof:', merkleProof);
  console.log("stakeAmountSat:", stakeAmountSat);
  console.log("stakingTime:", stakingTime);
  console.log("avs_symbiotic:", avs_symbiotic);

  console.log(
    "\n\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  );

  console.log("blockSequence:", blockSequence);
  console.log("");
  console.log("merkleProof:", merkleProof);

  try {
    // const tx = await vaultManagerContract.restakeInBabylonVault(
    //   blockSequence,
    //   blockIndex,
    //   txIndex,
    //   "0x" + txHash,
    //   merkleProof,
    //   address_receiver,
    //   stakeAmountSat,
    //   stakingTime * 10 * 60,
    //   avs_symbiotic,
    //   false
    // );
    // await tx.wait();
    console.log(
      "\n\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    console.log("👉 Restaking the Bitcoins on Ethereum");
    console.log("🔨 Minting the byzBTC");
    console.log("txHash:", tx?.hash || "0x....");
  } catch (error) {
    console.error("Erreur détaillée:", {
      message: error.message,
      code: error.code,
      data: error.data,
      transaction: error.transaction,
    });
  }
}

// Déplacer l'appel de verifyBitcoinTx dans une fonction principale
async function main() {
  try {
    let previousData = null;

    while (true) {
      // Fetch data
      let { data: currentData, error } = await supabase
        .from("list_symbiotic_rewards_receiver")
        .select("*");

      if (error) {
        console.error("Error while fetching:", error);
        continue;
      }

      // Compare with previous data
      if (previousData) {
        // Find only new elements (not present in previous data)
        const newElements = currentData.filter(
          (current) =>
            !previousData.some((prev) => prev.txHash === current.txHash)
        );

        if (newElements.length > 0) {
          newElements.forEach((element) => {
            console.log(
              "\n\n\n\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
            );
            console.log(
              "🆕 New bitcoin staking transaction detected:",
              element
            );
            //TODO put whatenever you want to do with the new elements
            verifyBitcoinTx(
              element.txHash,
              element.address_receiver,
              element.avs_symbiotic
            );
          });
        }
      } else {
        console.log("📊 Initial data:", currentData);
      }

      // Update previous data
      previousData = currentData;

      // Wait 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error("Error in main:", error);
  }
}

// Lancer le programme
main().catch(console.error);

// Gérer la fermeture propre
process.on("SIGINT", () => {
  console.log("\nArrêt du programme...");
  process.exit();
});
