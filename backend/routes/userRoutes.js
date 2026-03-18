const express = require("express");

const router = express.Router();

const User = require("../models/User");

const { protect } = require("../middleware/authMiddleware");

/* Get Logged In User Profile */

router.get("/profile", protect, async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/* Get All Users */

router.get("/", protect, async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;