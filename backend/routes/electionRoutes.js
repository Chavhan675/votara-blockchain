const express = require("express");

const router = express.Router();

const {
    createElection,
    getElections,
    getActiveElection,
    activateElection
} = require("../controllers/electionController");

const { protect } = require("../middleware/authMiddleware");

/* Create Election (Admin) */

router.post("/", protect, createElection);

/* Get All Elections */

router.get("/", getElections);

/* Get Active Election */

router.get("/active", getActiveElection);

/* Activate Election */

router.put("/activate/:id", protect, activateElection);

module.exports = router;