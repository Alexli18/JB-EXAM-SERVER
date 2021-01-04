const mongoose = require('mongoose');
const ChopingCartSchema = require('../models/chopingCart');


const ChopingCart = mongoose.model('ChopingCart', ChopingCartSchema);


const addChopingCart = async (cart) => {
    try{
        const newCart = new ChopingCart(cart);
        await newCart.save();
    }catch(err){ console.log(err) }
}

const deleteChopingCart = (id) => {
    return await ChopingCart.deleteOne({_id: id});
}

const updateChopingCart = async (id, params) => {
    return await ChopingCart.updateOne(
        {_id: id},
        {$set: params}
    );
}

const isCartExist = async (cart) => {
    const cartExist = await ChopingCart.findOne(cart);
    if(cartExist){
        return cartExist
    }else{
        return false
    }
}

module.exports = {
    addChopingCart,
    deleteChopingCart,
    updateChopingCart,
    isCartExist
}