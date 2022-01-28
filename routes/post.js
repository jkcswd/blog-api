const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.allPostsGet );
router.post('/', postController.createNewPost);
router.get('/:id', postController.onePostGet );
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
