const express = require('express');
const routes = express.Router();

// roleMiddleware ---
const { adminOnly } = require('../middlewares/roleMiddleware');
const { protect } = require('../middlewares/authMiddleware');

// Tournament Controller ---
const { getAllTournaments,publishTournament,getPublishedTournaments,createTournament,startTournament,completeTournament, getTournamentById } = require('../controllers/tournamentController')



// Routes ---
routes.post('/create', protect, adminOnly, createTournament);
routes.put('/publish/:id', protect,  adminOnly, publishTournament);
routes.get("/published", getPublishedTournaments);
routes.get('/:id', getTournamentById);
routes.put('/start/:id',protect, adminOnly, startTournament);
routes.put('/complete/:id',protect, adminOnly, completeTournament);
routes.get('/',getAllTournaments);







module.exports = routes;