const Candidate = require("../models/Candidates");

/* Create Candidate (Admin) */

exports.createCandidate = async (req, res) => {

    try {

        const { name, party, partyLogo, description, electionId } = req.body;

        const candidate = await Candidate.create({
            name,
            party,
            partyLogo,
            description,
            electionId
        });

        res.status(201).json(candidate);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Get All Candidates */

exports.getCandidates = async (req, res) => {

    try {

        const candidates = await Candidate.find();

        res.json(candidates);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


/* Get Single Candidate */

exports.getCandidateById = async (req, res) => {

    try {

        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        res.json(candidate);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};