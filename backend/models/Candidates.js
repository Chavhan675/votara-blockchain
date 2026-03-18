const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    party: {
        type: String,
        required: true
    },

    partyLogo: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    voteCount: {
        type: Number,
        default: 0
    },

    electionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election",
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);