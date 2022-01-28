const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.allCommentsGet );
router.post('/', commentController.createNewComment);
router.get('/:id', commentController.oneCommentGet );
router.patch('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
