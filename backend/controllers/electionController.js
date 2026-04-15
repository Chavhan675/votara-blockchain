const Election = require("../models/Election");

/* CREATE */
exports.createElection = async (req, res) => {
  try {
    const { title } = req.body;

    const election = await Election.create({
      title,
      isActive: false
    });

    res.status(201).json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL */
exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ACTIVE */
exports.getActiveElection = async (req, res) => {
  try {
    const election = await Election.findOne({ isActive: true });

    if (!election) {
      return res.status(404).json({
        message: "No active election"
      });
    }

    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ACTIVATE */
exports.activateElection = async (req, res) => {
  try {
    const { id } = req.params;

    await Election.updateMany({}, { isActive: false });

    const election = await Election.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};