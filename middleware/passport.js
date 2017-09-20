// config/passport.js

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const passport = require("passport");

const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const User = require("../models/user");

// load up the user model


// expose this function to our app using module.exports
module.exports = (passport) => {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
    });


    passport.use('local-login', new LocalStrategy((username, password, next) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
            return next(err);
            }
            if (!user) {
            return next(null, false, { message: "Incorrect username" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Incorrect password" });
            }

            return next(null, user);
        });
    }));

    passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
        process.nextTick(() => {
            User.findOne({
                'username': username
            }, (err, user) => {
                if (err){ return next(err); }

                if (user) {
                    return next(null, false, { message: "Username already exists" });
                } else {
                    const { username, email, description, password } = req.body;
                    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    const newUser = new User({
                    username,
                    email,
                    description,
                    password: hashPass
                    });

                    newUser.save((err) => {
                        if (err){ next(err); }
                        return next(null, newUser);
                    });
                }
            });
        });
    }));

    //FACEBOOK STRATEGY
    passport.use(new FbStrategy({
      clientID: "857307061101319",
      clientSecret: "6a3eace08f83082fe80681f9078c0105",
      callbackURL: "/auth/facebook/callback"
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookID: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          facebookID: profile.id,
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      });
    }));


    //GOOGLE STRATEGY
    passport.use(new GoogleStrategy({
      clientID: "881861196583-d8gjkkped1kgukjsg9cb6eedqja3k8c0.apps.googleusercontent.com",
      clientSecret: "JwlD-62nOiJLnODXHrWR6ftV",
      callbackURL: "/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          googleID: profile.id,
          username: profile.name.givenName + " " + profile.name.familyName
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      });

    }));

};
