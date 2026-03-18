const blockchainService = require("../services/blockchainService");

class VoteBlockchain {

    constructor() {

        this.chain = [];
        this.createGenesisBlock();

    }

    createGenesisBlock() {

        const genesisBlock = blockchainService.createBlock(
            { message: "Genesis Block" },
            "0"
        );

        this.chain.push(genesisBlock);

    }

    getLatestBlock() {

        return this.chain[this.chain.length - 1];

    }

    addVoteBlock(voteData) {

        const previousBlock = this.getLatestBlock();

        const newBlock = blockchainService.createBlock(
            voteData,
            previousBlock.hash
        );

        this.chain.push(newBlock);

        return newBlock;

    }

    getChain() {

        return this.chain;

    }

}

module.exports = new VoteBlockchain();