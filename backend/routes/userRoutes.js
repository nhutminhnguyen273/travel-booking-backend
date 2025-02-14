const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.findUserById);
router.get('/find/:username', UserController.findUserByUsername);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;