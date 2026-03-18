const Candidate = require("../models/Candidates");

class ResultService {

    async getElectionResults() {

        const results = await Candidate.find()
            .sort({ voteCount: -1 });

        return results;

    }

}

module.exports = new ResultService();