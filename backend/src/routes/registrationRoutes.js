const express = require('express');
const routes = express.Router();

// Registration controller ---
const { registerForTournament, getTournamentRegistrations, updateRegistrationStatus } = require('../controllers/registrationController');

// Middleware ---
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');


// Routes ---
routes.post('/register', protect, registerForTournament);
routes.get('/tournament/:tournamentId', protect, adminOnly , getTournamentRegistrations);
routes.put('/:id/status', protect, adminOnly , updateRegistrationStatus);



module.exports = routes;