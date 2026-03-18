const express = require("express");

const router = express.Router();

const {
    createCandidate,
    getCandidates,
    getCandidateById
} = require("../controllers/candidateController");

const { protect } = require("../middleware/authMiddleware");

/* Admin Create Candidate */

router.post("/", protect, createCandidate);

/* Get All Candidates */

router.get("/", getCandidates);

/* Get Single Candidate */

router.get("/:id", getCandidateById);

module.exports = router;