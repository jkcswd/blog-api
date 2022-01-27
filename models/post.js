const Schema = mongoose.Schema;

const PostSchema = new Schema({
  a_string: String,
  a_date: Date
});

const Post = mongoose.model('Post', PostSchema );
