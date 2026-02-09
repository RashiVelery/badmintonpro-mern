const express = require('express');
const routes = express.Router()
const {createTournament} = require('../controllers/tournamentController')




routes.post('/create', createTournament);








module.exports = routes;