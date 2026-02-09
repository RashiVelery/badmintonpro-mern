const Tournament = require('../models/Tournament');

const createTournament = async(req, res) => {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
}


module.exports = {createTournament}