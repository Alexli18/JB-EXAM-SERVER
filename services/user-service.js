const mongoose = require('mongoose');
const UserSchema = require('../models/users');


const User = mongoose.model('User', UserSchema);

const addUser = async (user) => {
    const userToSave = new User(user);
    try{
        await userToSave.save();
    }catch(err){
        console.log(err)
    }
}

const deleteUser = async (id) => {
    return await User.deleteOne({_id: id})
}

const updateUser = async (id, params) => {
    return await User.updateOne(
        {_id: id},
        {$set: params}
    );
}

const isUserExist = async (user) => {
    const { email, password } = user;
    const userExist =  await User.findOne({email, password});
    if(userExist){
        return userExist
    }else{
        return false
    }

}


module.exports = {
    addUser,
    isUserExist,
    updateUser,
    deleteUser
}