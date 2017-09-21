const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const configPassport = require('./middleware/passport');
const flash = require('connect-flash');
require("dotenv").config();


//MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI);

//DEFINE EXPRESS APP
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

app.use(session({
  secret: 'farm-voyage-dev',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash());

configPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

//PASSPORT

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req, res, next) => {
  if (typeof(req.user) !== "undefined"){
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});

//ROUTES
const index = require('./routes/index');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const maps = require('./routes/maps');

app.use('/', index);
app.use('/profile', profile);
app.use('/', auth);
app.use('/maps', maps);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
