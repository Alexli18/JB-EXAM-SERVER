const mongoose = require('mongoose');
const ChoppingItemSchema = require('../models/chopingItem');

const ChoppingItem = mongoose.model('ChoppingItem', ChoppingItemSchema);
const { getProductPriceByID } = require('./product-service');



//=================== ADD CHOPPING ITEM
const addChoppingItem = async (item) => {
    try{
        const isExist = await isItemExist(item);
        if( !isExist ){
            const id = item.productID;
            const itemPrice = await getProductPriceByID(id);
            item.totalPrice = itemPrice;
            const newItem = new ChoppingItem(item);
            return await newItem.save();
        }
        // item not exist
        return false;
    }catch(err){  console.log(err)  }
}

//==================== DELETE CHOPPING CART BY ID
const deleteChoppingItem = async (id) => {
    try{
        return await ChoppingItem.deleteOne({_id: id});
    }catch(err){ console.log(err) }
}


//==================== UPDATE CART (id, params)
const updateChopingCart = async (id, params) => {
    try{
        return await ChoppingItem.updateOne(
            {_id: id},
            {$set: params}
        );
    }catch(err){  console.log(err) }
}

//=================== CHECK IF CART EXIST
const isItemExist = async (item) => {
    try{
        const itemExist = await ChoppingItem.findOne(item);
        if(itemExist){
            return itemExist
        }else{
            return false
        }
    }catch(err){ console.log(err) }
}


module.exports = {
    addChoppingItem,
    deleteChoppingItem,
    updateChopingCart,
    isItemExist
}

