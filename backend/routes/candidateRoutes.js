// src/backend/routes/candidateRoutes.js

const express = require("express");
const router = express.Router();

// ✅ FIXED IMPORT
const Candidate = require("../models/Candidate");

/* ===========================
   📋 GET ALL CANDIDATES
=========================== */
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });

  } catch (error) {
    console.error("Get Candidates Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates"
    });
  }
});

/* ===========================
   ➕ ADD CANDIDATE
=========================== */
router.post("/", async (req, res) => {
  try {
    const { name, party } = req.body;

    const candidate = await Candidate.create({
      name,
      party
    });

    res.status(201).json({
      success: true,
      data: candidate
    });

  } catch (error) {
    console.error("Create Candidate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create candidate"
    });
  }
});

/* ===========================
   ❌ DELETE CANDIDATE
=========================== */
router.delete("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully"
    });

  } catch (error) {
    console.error("Delete Candidate Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete candidate"
    });
  }
});

module.exports = router;