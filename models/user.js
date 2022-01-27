const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  isAdmin: {type: Boolean, required: true}
});

UserSchema.virtual('fullName').get(function(){
  return this.firstName + this.lastName;
});

const User = mongoose.model('User', UserSchema );
