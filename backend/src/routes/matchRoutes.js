const express = require('express');
const routes = express.Router();

// MatchController ---
const { createMatch } = require('../controllers/matchController');

// roleMiddleware ---
const { adminOnly } = require('../middlewares/roleMiddleware');
const { protect } = require('../middlewares/authMiddleware')
// Routes ---
routes.post('/create', protect, adminOnly, createMatch);


module.exports = routes;