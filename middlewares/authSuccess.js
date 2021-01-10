
const mongoose = require('mongoose');
const UserSchema = require('../models/users');


const User = mongoose.model('User', UserSchema);

exports.get = async (req, res, next) => {

    try {
        if (req.session.passport.user) {

            // console.log('PASSPORT USER:',req.session.passport.user);

            const userObj = {};
            userObj.email = req.session.passport.user.emails[0].value;
            userObj.firstName = (req.session.passport.user.name) ? req.session.passport.user.name.givenName : '';
            userObj.lastName = (req.session.passport.user.name) ? req.session.passport.user.name.familyName : '';
            userObj.avatar = (req.session.passport.user.photos[0].value) ? req.session.passport.user.photos[0].value : '';
            userObj.socialId = req.session.passport.user.id;
            userObj.provider = req.session.passport.user.provider;

            req.session.userId = await User.findOne({socialId: userObj.socialId});
            if(!req.session.userId){
                const newUser = new User(userObj);
                await newUser.save();
                const savedUser = await User.findOne({ email: userObj.email});
                const id = savedUser.id;
                req.session.userId = id;
                return res.send(req.session);
                // res.redirect('/'); after deploy
            }

            res.redirect('/');
        } else {
            next('Authentication error');
        }
    } catch (e) {
        next(e);
    }
};