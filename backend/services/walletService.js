const { ethers } = require("ethers")

// validate wallet address
const isValidWalletAddress = (address) => {
  try {
    return ethers.isAddress(address)
  } catch (error) {
    return false
  }
}

// generate message for wallet signing
const generateWalletMessage = (walletAddress) => {
  return `Sign this message to authenticate with VOTARA: ${walletAddress}`
}

// verify signed message
const verifyWalletSignature = (message, signature) => {
  try {

    const signerAddress = ethers.verifyMessage(message, signature)

    return signerAddress

  } catch (error) {

    return null

  }
}

module.exports = {
  isValidWalletAddress,
  generateWalletMessage,
  verifyWalletSignature
}