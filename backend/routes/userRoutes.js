const express = require('express');
const Middleware = require('../middleware/middleware');
const UserController = require('../controllers/userController');

const router = express.Router();

// Routes chỉ dành cho Admin
router.get('/', Middleware.verifyTokenAdmin, UserController.getListUsers);
router.get('/user-delete', Middleware.verifyTokenAdmin, UserController.getListUserDeleted);
router.post('/', Middleware.verifyTokenAdmin, UserController.createUser);
router.put('/restore/:id', Middleware.verifyTokenAdmin, UserController.restoreUser);

// Routes cho cả Admin và User (người dùng chỉ có thể thao tác với chính tài khoản của mình)
router.get('/:id', Middleware.verifyTokenAdminAndUser, UserController.findUserById);
router.put('/:id', Middleware.verifyTokenAdminAndUser, UserController.updateUser);
router.put('/delete/:id', Middleware.verifyTokenAdminAndUser, UserController.deleteUser);

module.exports = router;