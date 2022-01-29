const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt
const dotenv = require('dotenv');
dotenv.config();

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { 
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (err) { return done(err); }
      if (res) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Incorrect password" })
      }
    });
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.JWT
}, (jwtPayload, done) => {
  User.findOne({id: jwtPayload.sub}, (err, user) => {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
}));