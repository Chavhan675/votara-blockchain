const Vote = require("../models/Vote");
const Candidate = require("../models/Candidates");
const voteBlockchain = require("../blockchain/voteBlockchain");

class VoteService {

    async recordVote(voterId, candidateId, electionId) {

        const voteData = {
            voter: voterId,
            candidate: candidateId,
            election: electionId
        };

        const block = voteBlockchain.addVoteBlock(voteData);

        const vote = await Vote.create({
            voter: voterId,
            candidate: candidateId,
            election: electionId,
            blockchainHash: block.hash
        });

        await Candidate.findByIdAndUpdate(
            candidateId,
            { $inc: { voteCount: 1 } }
        );

        return vote;

    }

}

module.exports = new VoteService();