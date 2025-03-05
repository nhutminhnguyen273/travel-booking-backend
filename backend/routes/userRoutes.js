const express = require('express');
const Middleware = require('../middleware/middleware');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getListUsers);
router.get('/user-delete/', UserController.getListUserDeleted);
router.get('/:id', UserController.findUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.put('/delete/:id', UserController.deleteUser);
router.put('/restore/:id', UserController.restoreUser);

module.exports = router;