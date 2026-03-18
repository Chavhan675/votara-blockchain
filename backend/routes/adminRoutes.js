const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getAllVotes,
    getResults
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

/* Admin Routes */

router.get("/users", protect, getAllUsers);

router.get("/votes", protect, getAllVotes);

router.get("/results", protect, getResults);

module.exports = router;