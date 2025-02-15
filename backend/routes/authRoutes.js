const express = require('express');
const AuthController = require('../controllers/authController');
const Middleware = require('../config/middleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refreshToken);
router.post("/logout", Middleware.verifyToken, AuthController.logout);

module.exports = router;