const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: {type: String, required: true},
  post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
  datePublished: {type: Date, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Comment', CommentSchema );
