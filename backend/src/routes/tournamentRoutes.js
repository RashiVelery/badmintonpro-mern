const express = require('express');
const routes = express.Router();

// roleMiddleware ---
const { adminOnly } = require('../middlewares/roleMiddleware');
const { protect } = require('../middlewares/authMiddleware');

// Tournament Controller ---
const { createTournament } = require('../controllers/tournamentController')
const { publishTournament } = require('../controllers/tournamentController')



// Routes ---
routes.post('/create', protect, adminOnly, createTournament);
routes.put('/publish/:id', protect,  adminOnly, publishTournament)







module.exports = routes;