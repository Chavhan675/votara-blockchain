const Vote = require("../models/Vote");
const Candidate = require("../models/Candidates");
const User = require("../models/User");

/* ================= CAST VOTE ================= */

exports.castVote = async (req, res) => {

  try {

    const { candidateId, electionId } = req.body;
    const userId = req.user.id; // ✅ FIXED

    // 🔥 Check if already voted in THIS election
    const existingVote = await Vote.findOne({
      voter: userId,
      election: electionId
    });

    if (existingVote) {
      return res.status(400).json({
        message: "You have already voted in this election"
      });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found"
      });
    }

    // ✅ Create vote
    const vote = await Vote.create({
      voter: userId,
      candidate: candidateId,
      election: electionId
    });

    // ✅ Increase vote count
    candidate.voteCount += 1;
    await candidate.save();

    // ✅ Mark user voted
    await User.findByIdAndUpdate(userId, { hasVoted: true });

    res.status(201).json({
      success: true,
      message: "Vote cast successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};


/* ================= CHECK VOTE STATUS (NEW) ================= */

exports.getVoteStatus = async (req, res) => {

  try {

    const userId = req.user.id;
    const { electionId } = req.query;

    const vote = await Vote.findOne({
      voter: userId,
      election: electionId
    });

    res.json({
      voted: !!vote
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};


/* ================= GET RESULTS ================= */

exports.getResults = async (req, res) => {

  try {

    const candidates = await Candidate.find().sort({ voteCount: -1 });

    res.json(candidates);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

};