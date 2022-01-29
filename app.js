const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const passport = require("passport");

dotenv.config();
require('./passport');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const authRouter = require('./routes/auth');

const app = express();

const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', passport.authenticate('jwt', {session: false}), userRouter);
app.use('/api/post', passport.authenticate('jwt', {session: false}), postRouter);
app.use('/api/comment', passport.authenticate('jwt', {session: false}), commentRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Route not found" });
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.status(404).json({ message: `error: ${err.message}` });
});

module.exports = app;
