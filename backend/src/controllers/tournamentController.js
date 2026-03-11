const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');


const createTournament = async (req, res) => {
    try {

        const {
            name,
            type,
            category,
            courts,
            location,
            price,
            image,
            time,
            slots
        } = req.body;

        const tournament = await Tournament.create({
            name,
            type,
            category,
            courts,
            location,
            price,
            image,
            time,
            slots,
            status: "draft",
            createdBy: req.user?.id
        });

        res.status(201).json(tournament);

    } catch (error) {
        console.log(error)
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

const getPublishedTournaments = async (req, res) => {
    try {

        const tournaments = await Tournament.find({
            status: { $in: ["published", "ongoing", "draft"] }
        });


        res.status(200).json(tournaments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const startTournament = async (req, res) => {

    const { id } = req.params;

    const tournament = await Tournament.findById(id);

    if (tournament.status !== "published") {
        return res.status(400).json({
            message: "Tournament must be published first"
        });
    }

    tournament.status = "ongoing";
    await tournament.save();

    res.json({
        message: "Tournament started",
        tournament
    });

}

const completeTournament = async (req, res) => {

    const { id } = req.params;

    const tournament = await Tournament.findById(id);

    if (tournament.status !== "ongoing") {
        return res.status(400).json({
            message: "Tournament must be ongoing"
        });
    }

    tournament.status = "completed";
    await tournament.save();

    res.json({
        message: "Tournament completed",
        tournament
    });

}

const getTournamentById = async (req, res) => {
    try {

        const tournament = await Tournament.findById(req.params.id);

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        res.status(200).json(tournament);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTournaments = async (req, res) => {
    try {

        const tournaments = await Tournament.find()

        const result = await Promise.all(
            tournaments.map(async (t) => {

                const registeredCount = await Registration.countDocuments({
                    tournament: t._id,
                    status: { $ne: "pending" }
                })

                const remainingSlots = t.slots - registeredCount

                return {
                    ...t._doc,
                    registeredCount,
                    remainingSlots
                }

            })
        )

        res.json(result)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createTournament, publishTournament, getPublishedTournaments, startTournament, completeTournament, getTournamentById, getAllTournaments }