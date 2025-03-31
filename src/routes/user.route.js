const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const UserController = require("../controllers/user.controller");

// Admin
router.get("/", Middleware.verifyTokenAdmin, UserController.getListUsers);
router.post("/", Middleware.verifyTokenAdmin, UserController.createUser);
router.put("/restore/:id", Middleware.verifyTokenAdmin, UserController.restoreUser);

// Admin và User
router.get("/:id", Middleware.verifyTokenAdminAndUser, UserController.getUserById);
router.put("/:id", Middleware.verifyTokenAdminAndUser, UserController.updateUser);
router.delete("/:id", Middleware.verifyTokenAdminAndUser, UserController.deleteUser);

module.exports = router;