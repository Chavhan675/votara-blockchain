const express = require("express");
const router = express.Router();

// ✅ Import controller
const voteController = require("../controllers/voteController");

// ✅ Auth middleware
const { protect } = require("../middleware/authMiddleware");

/* ================= ROUTES ================= */

/**
 * @route   POST /api/votes/cast
 * @desc    Cast a vote
 * @access  Private
 */
router.post("/cast", protect, voteController.castVote);

/**
 * @route   GET /api/votes/status?electionId=123
 * @desc    Check if user has voted
 * @access  Private
 */
router.get("/status", protect, voteController.getVoteStatus);

/**
 * @route   GET /api/votes/results
 * @desc    Get election results
 * @access  Public
 */
router.get("/results", voteController.getResults);

module.exports = router;