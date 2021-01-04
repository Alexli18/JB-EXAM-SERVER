const mongoose = require('mongoose');
const ChoppingItemSchema = require('../models/chopingItem');

const ChoppingItem = mongoose.model('ChoppingItem', ChoppingItemSchema);


const addChoppingItem = async (item) => {
    try{
        //ADD TOTAL PRICE
        // item.totalPrice = xxxxxx
        const newItem = new ChoppingItem(item);
        await newItem.save()
    }catch(err){  console.log(err)  }
}

const deleteChoppingItem = async (id) => {
    return await ChoppingItem.deleteOne({_id: id});
}

const updateChopingCart = async (id, params) => {
    return await ChoppingItem.updateOne(
        {_id: id},
        {$set: params}
    );
}


const isItemExist = async (item) => {
    const itemExist = await ChoppingItem.findOne(item);
    if(itemExist){
        return itemExist
    }else{
        return false
    }
}


module.exports = {
    addChoppingItem,
    deleteChoppingItem,
    updateChopingCart,
    isItemExist
}

