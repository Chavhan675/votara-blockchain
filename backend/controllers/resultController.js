const resultService = require("../services/resultService");

exports.getResults = async (req, res) => {

    try {

        const results = await resultService.getElectionResults();

        res.json(results);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};