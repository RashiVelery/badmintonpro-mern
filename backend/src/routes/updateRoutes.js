const express = require('express');
const routes = express.Router();
const {addScore, resumeMatch, undoScore, redoScore} = require('../controllers/updateController');



routes.post('/:id/score', addScore);
routes.post('/:id/resume', resumeMatch);
routes.post("/:id/undo", undoScore);
routes.post("/:id/redo", redoScore);


module.exports = routes;