const mongoose = require('mongoose');
const UserSchema = require('./models/users');
const User = mongoose.model('User', UserSchema);

module.exports.commonMW = async (req, res, next) => {

    res.locals.title = 'Shop Online';
    res.locals.fullYear = (new Date()).getFullYear();
    res.locals.userProfile = '';

    if (req.session.userId) {
        res.locals.userProfile = await User.findOne({_id: req.session.userId});
    }
    next();
};