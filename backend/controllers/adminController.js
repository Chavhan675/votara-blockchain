const User = require("../models/User");
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidates");

/* Get All Users */

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Get All Votes */

exports.getAllVotes = async (req, res) => {

    try {

        const votes = await Vote.find()
        .populate("voter", "name email")
        .populate("candidate", "name party");

        res.json(votes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Get Election Results */

exports.getResults = async (req, res) => {

    try {

        const results = await Candidate.find().sort({ voteCount: -1 });

        res.json(results);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};