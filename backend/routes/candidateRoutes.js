const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidates");

router.get("/", async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

module.exports = router;