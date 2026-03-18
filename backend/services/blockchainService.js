const crypto = require("crypto");

class BlockchainService {

    createBlock(data, previousHash = "") {

        const timestamp = Date.now();

        const blockString =
            JSON.stringify(data) +
            timestamp +
            previousHash;

        const hash = crypto
            .createHash("sha256")
            .update(blockString)
            .digest("hex");

        return {
            data,
            timestamp,
            previousHash,
            hash
        };
    }

}

module.exports = new BlockchainService();