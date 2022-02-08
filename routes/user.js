const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();0
const passport = require('passport');

require('../passport');

router.get('/', passport.authenticate('jwt', {session: false}), userController.allUsersGet );
router.post('/', passport.authenticate('jwt', {session: false}), userController.createNewUser);
router.get('/:id', passport.authenticate('jwt', {session: false}), userController.oneUserGet );
router.patch('/:id', passport.authenticate('jwt', {session: false}), userController.updateUser);
router.delete('/:id', passport.authenticate('jwt', {session: false}), userController.deleteUser);


module.exports = router;
