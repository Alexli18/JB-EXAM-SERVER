const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
        type: String
    },
    passportId: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    socialId: {
        type: String,
        required: false
    }
});

UserSchema.index(
    {email: 1}, {unique: true, dropDups: true}
);



module.exports = UserSchema;