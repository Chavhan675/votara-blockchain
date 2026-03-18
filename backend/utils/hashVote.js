const crypto = require("crypto");

const hashVote = (voterId, candidateId, electionId) => {

    const voteString = `${voterId}-${candidateId}-${electionId}-${Date.now()}`;

    const hash = crypto
        .createHash("sha256")
        .update(voteString)
        .digest("hex");

    return hash;
};

module.exports = hashVote;