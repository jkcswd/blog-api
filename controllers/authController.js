const jwt = require('jsonwebtoken');
const passport = require("passport");

exports.authController = (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) { return next(err); }

    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.send(err);
      }

      if(user) {
        const token = jwt.sign(user.toJSON(), process.env.JWT );
      
        return res.json({user, token});
      }else {
        return res.send({Message:"Something went wrong"})
      }


    });
  })(req, res);
}