const Vote = require("../models/Vote");
const Candidate = require("../models/Candidates");
const voteBlockchain = require("../blockchain/voteBlockchain");

class VoteService {

    async recordVote(voterId, candidateId, electionId) {

        try {

            // ✅ Validate input
            if (!voterId || !candidateId || !electionId) {
                throw new Error("Missing required fields");
            }

            // ✅ Check candidate exists
            const candidate = await Candidate.findById(candidateId);
            if (!candidate) {
                throw new Error("Candidate not found");
            }

            // ✅ Prepare vote data
            const voteData = {
                voter: voterId,
                candidate: candidateId,
                election: electionId
            };

            // ✅ Add to blockchain
            const block = voteBlockchain.addVoteBlock(voteData);

            // ✅ Save vote in DB
            const vote = await Vote.create({
                voter: voterId,
                candidate: candidateId,
                election: electionId,
                blockchainHash: block.hash
            });

            // ✅ Increment vote count
            await Candidate.findByIdAndUpdate(
                candidateId,
                { $inc: { voteCount: 1 } }
            );

            return vote;

        } catch (error) {
            console.error("Vote Error:", error.message);
            throw error;
        }

    }

}

module.exports = new VoteService();