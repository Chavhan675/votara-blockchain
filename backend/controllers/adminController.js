// src/backend/controllers/adminController.js

const User = require("../models/User");
const Vote = require("../models/vote");
const Candidate = require("../models/Candidate");

/* ===========================
   👤 GET ALL USERS
=========================== */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        console.error("Get Users Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};

/* ===========================
   🗳️ GET ALL VOTES
=========================== */
exports.getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.find()
            .populate("voter", "name email")
            .populate("candidate", "name party")
            .populate("election", "title");

        res.status(200).json({
            success: true,
            count: votes.length,
            data: votes
        });

    } catch (error) {
        console.error("Get Votes Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch votes"
        });
    }
};

/* ===========================
   📊 GET ELECTION RESULTS
=========================== */
exports.getResults = async (req, res) => {
    try {
        const results = await Candidate.find().sort({ voteCount: -1 });

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error("Get Results Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch results"
        });
    }
};

/* ===========================
   🔍 GET SINGLE USER
=========================== */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("Get User Error:", error);

        res.status(500).json({
            success: false,
            message: "Error fetching user"
        });
    }
};

/* ===========================
   ❌ DELETE USER
=========================== */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("Delete User Error:", error);

        res.status(500).json({
            success: false,
            message: "Error deleting user"
        });
    }
};