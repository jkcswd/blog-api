const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

router.post('/', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err) { return next(err); }

    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.send(err);
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT );
      
      return res.json({user, token});
    });
  })(req, res);
});

module.exports = router;