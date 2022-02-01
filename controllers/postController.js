const Comment = require('../models/comment');
const Post = require('../models/post');

exports.allPostsGet = (req, res, next) => {
  Post.find().populate('user').exec((err, data) => {
    if (err) { return next(err); }

    res.send(data)
  });
}
exports.onePostGet = (req, res, next) => {
  Post.findById(req.params.id, (err, data) => {
    if (err) { return next(err); }

    res.send(data);
  });
}

exports.createNewPost = (req, res, next) => {
  new Post(
    {
      title: req.body.title,
      text: req.body.text,
      user: req.body.user,
      datePublished: new Date(),
      isPublished: req.body.isPublished
    }
  ).save(err => {
    if (err) { return next(err); }

    res.send({"message":`Post Saved: ${req.body.title}`})
  });
}

exports.updatePost = (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err) =>{
    if (err) { return next(err); }

    res.send({"message": `Updated Post: ${req.params.id}`})
  });
}

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) { return next(err); }

    res.send({"message": `Deleted Post: ${req.params.id}`})
  });
}

exports.getCommentsForPost = (req, res, next) => {
  Comment.find({ post: req.params.id }).populate('user').exec((err, comments) => {
    if (err) { return next(err); }

    res.send(comments);
  });
}