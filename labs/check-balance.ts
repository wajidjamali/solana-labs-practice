import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js"
const publickey = "6EDB91UvJrmErTF81rmJFcS22mdn6eYiSJG5EASXpnDS"

 const suppliedPublicKey = process.argv[2]
 if (!suppliedPublicKey){
     throw new Error("Provide a public key to check the balance of!");
    
 }

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")
const address = new PublicKey(publickey)
const balance = await connection.getBalance(address)
const balanceInSol = balance / LAMPORTS_PER_SOL

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
console.log(`✅ Finished! again`);
