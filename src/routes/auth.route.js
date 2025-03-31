const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const AuthController = require("../controllers/auth.controller");
const { resetPassword } = require("../services/auth.service");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", Middleware.verifyToken, AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;