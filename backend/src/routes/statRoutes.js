const express = require('express');
const routes = express.Router();

const {getParticipantStats}= require('../controllers/statController');



routes.get('/:tournamentId/:playerName', getParticipantStats);


module.exports = routes;