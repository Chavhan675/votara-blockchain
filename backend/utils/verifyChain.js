const crypto = require("crypto");

const verifyChain = (chain) => {

    for (let i = 1; i < chain.length; i++) {

        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        const blockString =
            JSON.stringify(currentBlock.data) +
            currentBlock.timestamp +
            currentBlock.previousHash;

        const recalculatedHash = crypto
            .createHash("sha256")
            .update(blockString)
            .digest("hex");

        if (currentBlock.hash !== recalculatedHash) {
            return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
        }

    }

    return true;

};

module.exports = verifyChain;