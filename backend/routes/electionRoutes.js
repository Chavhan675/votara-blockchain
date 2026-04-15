const express = require("express");
const router = express.Router();

const electionController = require("../controllers/electionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, electionController.createElection);
router.get("/", electionController.getElections);
router.get("/active", electionController.getActiveElection);
router.put("/activate/:id", protect, electionController.activateElection);

module.exports = router;