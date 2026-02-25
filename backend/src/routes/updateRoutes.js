const express = require('express');
const routes = express.Router();
const { addScore, resumeMatch, undoScore, redoScore } = require('../controllers/updateController');

// Middleware ---
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');

routes.post('/:id/score', protect, adminOnly, addScore);
routes.post('/:id/resume', protect, adminOnly, resumeMatch);
routes.post("/:id/undo", protect, adminOnly, undoScore);
routes.post("/:id/redo", protect, adminOnly, redoScore);



module.exports = routes;