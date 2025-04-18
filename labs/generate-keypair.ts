import dotenv from "dotenv";
dotenv.config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

// Generating public and private keypairs

const newKeypair = Keypair.generate();

console.log(`The public key is: `, newKeypair.publicKey.toBase58());
console.log(`The secret key is: `, newKeypair.secretKey);
console.log(`✅ Finished!`);

// Loading an existing keypair from an .env file

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);
