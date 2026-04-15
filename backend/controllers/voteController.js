const mongoose = require("mongoose");
const Vote = require("../models/Vote");
const Candidate = require("../models/Candidates");
const User = require("../models/User");

/* ================= CAST VOTE ================= */
exports.castVote = async (req, res) => {
  try {
    const { candidateId, electionId } = req.body;
    const userId = req.user.id;

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

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    await Vote.create({
      voter: userId,
      candidate: candidateId,
      election: electionId
    });

    await Candidate.findByIdAndUpdate(candidateId, {
      $inc: { voteCount: 1 }
    });

    await User.findByIdAndUpdate(userId, {
      hasVoted: true
    });

    return res.status(201).json({
      success: true,
      message: "✅ Vote cast successfully"
    });

  } catch (error) {
    console.error("CAST VOTE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


/* ================= GET RESULTS (🔥 FIXED) ================= */
exports.getResults = async (req, res) => {
  try {
    const { electionId } = req.query;

    let filter = {};
    if (electionId && mongoose.Types.ObjectId.isValid(electionId)) {
      filter.election = electionId;
    }

    const candidates = await Candidate.find(filter)
      .sort({ voteCount: -1 });

    // 🔥 FORMAT FIX FOR FRONTEND
    const results = candidates.map(c => ({
      _id: c._id,
      name: c.name,
      votes: c.voteCount || 0   // ✅ IMPORTANT
    }));

    return res.json(results);   // ✅ RETURN ARRAY DIRECTLY

  } catch (error) {
    console.error("RESULT ERROR:", error);
    return res.status(500).json({
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

    return res.json({
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