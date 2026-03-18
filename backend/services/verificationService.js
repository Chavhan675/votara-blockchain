const voteBlockchain = require("../blockchain/voteBlockchain");
const verifyChain = require("../utils/verifyChain");

class VerificationService {

    verifyVotes() {

        const chain = voteBlockchain.getChain();

        const isValid = verifyChain(chain);

        return {
            valid: isValid,
            chainLength: chain.length,
            chain
        };

    }

}

module.exports = new VerificationService();