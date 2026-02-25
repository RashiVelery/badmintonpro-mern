const { rawListeners } = require('../models/Registration');
const Tournament = require('../models/Tournament');

const createTournament = async (req, res) => {
    try {

        const {
            name,
            type,
            category,
            courts,
            rules
        } = req.body;

        const tournament = await Tournament.create({
            name,
            type,
            category,
            courts,
            rules,
            status: "draft",
            createdBy: req.user.id
        });
        
        res.status(201).json(tournament);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const publishTournament = async (req, res) => {
    try {
        const { id } = req.params;

        const tournament = await Tournament.findById(id);


        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        if (tournament.status !== "draft") {
            return res.status(400).json({
                message: "Only draft tournaments can be published"
            });
        }

        tournament.status = "published";
        await tournament.save();

        res.status(200).json({
            message: "Tournament published successfully",
            tournament
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    };
}

module.exports = { createTournament, publishTournament }