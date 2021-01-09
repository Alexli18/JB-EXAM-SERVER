
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const Config = require('./config');
const mongoose = require('mongoose');
const UserSchema = require('../models/users');


const User = mongoose.model('User', UserSchema);

module.exports = passport => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj._id);
    });


    //============ GOOGLE
    passport.use('google', new GoogleStrategy({
            clientID: Config.oauth.googleAuth.clientID,
            clientSecret: Config.oauth.googleAuth.clientSecret,
            callbackURL: Config.oauth.googleAuth.callbackURL
        },
        function(request, accessToken, refreshToken, profile, done) {
            process.nextTick(() => {
                profile._id = profile.id;
                done(null, profile);
            });
        }));

    //============ FACEBOOK
    passport.use('facebook', new FacebookStrategy({
            clientID: Config.oauth.facebookAuth.clientID,
            clientSecret: Config.oauth.facebookAuth.clientSecret,
            callbackURL: Config.oauth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'name', 'gender', "emails", 'photos']
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(() => {
                profile._id = profile.id;
                done(null, profile);
            });
        }));

    //=========== LOCAL
    passport.use('local', new LocalStrategy(
        function(username, password, done) {
          User.findOne({ email: username, password }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
          });
        }
        ));
};

