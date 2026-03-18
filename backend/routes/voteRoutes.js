const express = require("express");
const router = express.Router();

const {
  castVote,
  getResults,
  getVoteStatus // 🔥 NEW
} = require("../controllers/voteController");

const { protect } = require("../middleware/authMiddleware");

/* Cast Vote */
router.post("/cast", protect, castVote);

/* Check if user already voted */
router.get("/status", protect, getVoteStatus); // 🔥 NEW

/* Get election results */
router.get("/results", getResults);

module.exports = router;