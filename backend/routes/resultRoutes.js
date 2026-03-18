const express = require("express");

const router = express.Router();

const { getResults } = require("../controllers/resultController");

/* Get Election Results */

router.get("/", getResults);

module.exports = router;