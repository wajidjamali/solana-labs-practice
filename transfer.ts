import dotenv from "dotenv";
dotenv.config();
import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToPubkey = process.argv[2] || null;
if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

const receiverPubkey = new PublicKey(suppliedToPubkey);
console.log("Sender (your wallet):", senderKeypair.publicKey.toBase58());
console.log("Receiver:", receiverPubkey.toBase58());
const senderBalance = await connection.getBalance(senderKeypair.publicKey);
console.log(`Sender balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);
const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);