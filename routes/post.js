const express = require('express');
const passport = require('passport');
const router = express.Router();
const postController = require('../controllers/postController');

require('../passport');

router.get('/', postController.allPostsGet );
router.post('/', passport.authenticate('jwt', {session: false}), postController.createNewPost);
router.get('/:id', postController.onePostGet );
router.patch('/:id', passport.authenticate('jwt', {session: false}), postController.updatePost);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postController.deletePost);

module.exports = router;
