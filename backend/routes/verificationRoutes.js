const express = require("express");

const router = express.Router();

const verificationService = require("../services/verificationService");

/* Verify Vote Blockchain */

router.get("/", (req, res) => {

    try {

        const result = verificationService.verifyVotes();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;