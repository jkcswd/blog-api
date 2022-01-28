const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.allUsersGet );
router.post('/', userController.createNewUser);
router.get('/:id', userController.oneUserGet );
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;
