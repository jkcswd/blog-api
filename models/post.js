const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String, required: true, maxLength: 300},
  text: {type: String, required: true},
  user:{type: Schema.Types.ObjectId, ref: 'User', required: true},
  datePublished: {type: Date ,required: true},
  isPublished: {type: Boolean, required: true}
});

PostSchema.virtual('url').get(function() {
  return '/api/post/' + this._id;
});

const Post = mongoose.model('Post', PostSchema );
