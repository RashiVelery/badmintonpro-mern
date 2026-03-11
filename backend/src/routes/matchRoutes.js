const express = require('express');
const routes = express.Router();

// MatchController ---
const { generateMatches, getMatchesByTournament,getMatchById } = require("../controllers/matchController")

// roleMiddleware ---
const { adminOnly } = require('../middlewares/roleMiddleware');
const { protect } = require('../middlewares/authMiddleware')
// Routes ---

routes.post("/generate/:tournamentId", protect, adminOnly, generateMatches)
routes.get("/:tournamentId", getMatchesByTournament)
routes.get("/single/:id", getMatchById)

module.exports = routes;
