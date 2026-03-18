const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

/* ================= ROUTES ================= */

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// 🔥 Profile (Protected)
router.get("/profile", protect, getUserProfile);

module.exports = router;