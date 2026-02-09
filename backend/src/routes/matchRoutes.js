const express = require('express');
const routes = express.Router();
const {createMatch } = require('../controllers/matchController');


routes.post('/create', createMatch);


module.exports = routes;