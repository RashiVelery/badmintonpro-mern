const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const routes = express.Router()
const { protect } = require('../middlewares/authMiddleware')



routes.post('/signup', signup);
routes.post('/login', login);
routes.post('/logout', logout)


routes.get("/me", protect, (req, res) => {
    res.json(req.user);
});





module.exports = routes;