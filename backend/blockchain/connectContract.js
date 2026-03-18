const { ethers } = require("ethers")
require("dotenv").config()

let provider = null
let wallet = null

try {

if(process.env.RPC_URL && process.env.PRIVATE_KEY){

provider = new ethers.JsonRpcProvider(process.env.RPC_URL)

wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

console.log("Blockchain connected")

}else{

console.log("Blockchain not configured yet")

}

} catch (error) {

console.log("Blockchain connection error:", error.message)

}

module.exports = {
provider,
wallet
}