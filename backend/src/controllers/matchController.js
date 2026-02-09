const Match = require('../models/Match');


const createMatch = async (req, res) => {
    const { tournament, teamA, teamB, rules } = req.body;


    const match = await Match.create({
        tournament: tournament,
        teams: { teamA , teamB },
        rules
    });

    res.status(201).json(match);
};

module.exports = {createMatch}