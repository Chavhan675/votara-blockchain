const Election = require("../models/Election");

/* Create Election (Admin) */

exports.createElection = async (req, res) => {

    try {

        const { title, description, startDate, endDate } = req.body;

        const election = await Election.create({
            title,
            description,
            startDate,
            endDate
        });

        res.status(201).json(election);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Get All Elections */

exports.getElections = async (req, res) => {

    try {

        const elections = await Election.find();

        res.json(elections);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Get Active Election */

exports.getActiveElection = async (req, res) => {

    try {

        const election = await Election.findOne({ isActive: true });

        res.json(election);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Activate Election */

exports.activateElection = async (req, res) => {

    try {

        await Election.updateMany({}, { isActive: false });

        const election = await Election.findById(req.params.id);

        election.isActive = true;

        await election.save();

        res.json({
            message: "Election activated",
            election
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};