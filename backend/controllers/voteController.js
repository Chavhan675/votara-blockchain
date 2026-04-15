// src/backend/controllers/voteController.js

const mongoose = require("mongoose");
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate"); // ✅ FIXED
const User = require("../models/User");

/* ================= CAST VOTE ================= */
exports.castVote = async (req, res) => {
  try {
    const { candidateId, electionId } = req.body;
    const userId = req.user.id;

    // ✅ Validate input
    if (!candidateId || !electionId) {
      return res.status(400).json({
        success: false,
        message: "candidateId and electionId are required"
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(candidateId) ||
      !mongoose.Types.ObjectId.isValid(electionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid candidateId or electionId"
      });
    }

    // ✅ Check already voted
    const existingVote = await Vote.findOne({
      voter: userId,
      election: electionId
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted"
      });
    }

    // ✅ Check candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    // ✅ Create vote
    const vote = await Vote.create({
      voter: userId,
      candidate: candidateId,
      election: electionId
    });

    // ✅ Increment vote count
    await Candidate.findByIdAndUpdate(candidateId, {
      $inc: { voteCount: 1 }
    });

    // ✅ Update user
    await User.findByIdAndUpdate(userId, {
      hasVoted: true
    });

    return res.status(201).json({
      success: true,
      message: "Vote cast successfully",
      data: vote
    });

  } catch (error) {
    console.error("CAST VOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


/* ================= GET RESULTS ================= */
exports.getResults = async (req, res) => {
  try {
    const { electionId } = req.query;

    let filter = {};

    if (electionId && mongoose.Types.ObjectId.isValid(electionId)) {
      filter.election = electionId;
    }

    const candidates = await Candidate.find(filter)
      .sort({ voteCount: -1 });

    const results = candidates.map(c => ({
      _id: c._id,
      name: c.name,
      votes: c.voteCount || 0
    }));

    return res.status(200).json(results);

  } catch (error) {
    console.error("RESULT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


/* ================= CHECK VOTE STATUS ================= */
exports.getVoteStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { electionId } = req.query;

    if (!electionId) {
      return res.status(400).json({
        success: false,
        message: "electionId is required"
      });
    }

    const vote = await Vote.findOne({
      voter: userId,
      election: electionId
    });

    return res.status(200).json({
      success: true,
      voted: !!vote
    });

  } catch (error) {
    console.error("STATUS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};