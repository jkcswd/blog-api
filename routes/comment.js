const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const passport = require('passport');

require('../passport');

router.get('/', commentController.allCommentsGet );
router.post('/', commentController.createNewComment);
router.get('/:id', commentController.oneCommentGet );
router.patch('/:id', passport.authenticate('jwt', {session: false}), commentController.updateComment);
router.delete('/:id', passport.authenticate('jwt', {session: false}), commentController.deleteComment);

module.exports = router;
