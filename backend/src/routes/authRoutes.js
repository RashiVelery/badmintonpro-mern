const express = require('express');
const { signup, login, logout, toggleUserStatus } = require('../controllers/authController');
const routes = express.Router()
const { protect } = require('../middlewares/authMiddleware');
const getAllUsers = require('../controllers/userController');



routes.post('/signup', signup);
routes.post('/login', login);
routes.post('/logout', logout)
routes.get('/users', getAllUsers);
routes.patch('/users/toggle-status/:id' , toggleUserStatus);

routes.get("/me", protect, (req, res) => {
    res.json(req.user);
});





module.exports = routes;