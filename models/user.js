const Schema = mongoose.Schema;

const UserSchema = new Schema({
  a_string: String,
  a_date: Date
});

const User = mongoose.model('User', UserSchema );
