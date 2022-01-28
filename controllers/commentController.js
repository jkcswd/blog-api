const Comment = require('../models/comment');

exports.allCommentsGet = (req, res, next) => {
  Comment.find().exec((err, data) => {
    if (err) { return next(err); }

    res.send(data)
  });
}
exports.oneCommentGet = (req, res, next) => {
  Comment.findById(req.params.id, (err, data) => {
    if (err) { return next(err); }

    res.send(data);
  });
}

exports.createNewComment = (req, res, next) => {
  new Comment(
    {
      comment: req.body.comment,
      post: req.body.post,
      datePublished: new Date(),
      user: req.body.user
    }
  ).save(err => {
    if (err) { return next(err); }

    res.send({"message":`Comment Saved: ${req.body.comment}`})
  });
}

exports.updateComment = (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err) =>{
    if (err) { return next(err); }

    res.send({"message": `Updated Comment: ${req.params.id}`})
  });
}

exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id, (err) => {
    if (err) { return next(err); }

    res.send({"message": `Deleted Comment: ${req.params.id}`})
  });
}