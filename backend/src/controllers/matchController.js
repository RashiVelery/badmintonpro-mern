const Match = require("../models/Match")
const Registration = require("../models/Registration")
const Tournament = require("../models/Tournament")

// ================= GENERATE MATCHES =================

const generateMatches = async (req, res) => {

    try {

        const { tournamentId } = req.params

        // 1️⃣ Check if matches already generated
        const existingMatches = await Match.find({ tournament: tournamentId })

        if (existingMatches.length > 0) {
            return res.status(400).json({
                message: "Matches already generated"
            })
        }

        // 2️⃣ Get tournament
        const tournament = await Tournament.findById(tournamentId)

        if (!tournament) {
            return res.status(404).json({
                message: "Tournament not found"
            })
        }

        // 3️⃣ Get approved registrations
        const registrations = await Registration.find({
            tournament: tournamentId,
            status: "approved"
        }).populate("user")

        const players = registrations.map(r => r.user._id)

        // 4️⃣ Check slots full
        if (players.length !== tournament.slots) {
            return res.status(400).json({
                message: "Slots not full. Cannot generate matches"
            })
        }

        // 5️⃣ Shuffle players
        players.sort(() => Math.random() - 0.5)

        const matches = []

        // 6️⃣ Create matches
        for (let i = 0; i < players.length; i += 2) {

            if (players[i + 1]) {

                const match = await Match.create({
                    tournament: tournamentId,
                    teams: {
                        teamA: players[i],
                        teamB: players[i + 1]
                    }
                })

                matches.push(match)

            }

        }

        res.json(matches)

    } catch (err) {

        res.status(500).json({
            message: err.message
        })

    }

}


// ================= GET MATCHES =================

const getMatchesByTournament = async (req, res) => {

    try {

        const { tournamentId } = req.params

        const matches = await Match.find({
            tournament: req.params.tournamentId
        })
            .populate("teams.teamA")
            .populate("teams.teamB")

        res.json(matches)

    } catch (err) {

        res.status(500).json({
            message: err.message
        })

    }

}

const getMatchById = async (req, res) => {
    const match = await Match.findById(req.params.id)
        .populate("teams.teamA")
        .populate("teams.teamB")

    res.json(match)
}


module.exports = {
    generateMatches,
    getMatchesByTournament,
    getMatchById
}