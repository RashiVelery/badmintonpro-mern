const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const routes = express.Router()




routes.post('/signup', signup);
routes.post('/login', login);
routes.post ('/logout',logout)






module.exports = routes;