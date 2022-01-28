const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.allUsersGet = (req, res, next) => {
  User.find().exec((err, data) => {
    if (err) { return next(err); }

    res.send(data)
  });
}
exports.oneUserGet = (req, res, next) => {
  User.findById(req.params.id, (err, data) => {
    if (err) { return next(err); }

    res.send(data);
  });
}

exports.createNewUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) =>{
    if(err) { return next(err); }

    new User(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      }
    ).save(err => {
      if (err) { return next(err); }
  
      res.send({"message":`User Saved: ${req.body.username}`})
    });
  });
}

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err) =>{
    if (err) { return next(err); }

    res.send({"message": `Updated user: ${req.params.id}`})
  });
}

exports.deleteUser = (req, res, next) => {
  User.findByIdAndDelete(req.params.id, (err) => {
    if (err) { return next(err); }

    res.send({"message": `Deleted user: ${req.params.id}`})
  });
}