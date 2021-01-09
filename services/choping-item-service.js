const mongoose = require('mongoose');
const ChoppingItemSchema = require('../models/chopingItem');
const { getProductPriceByID } = require('./product-service');

const ChoppingItem = mongoose.model('ChoppingItem', ChoppingItemSchema);
// const { getProductPriceByID } = require('./product-service');

//================== GET ALL CHOPPING ITEMS
const getAllChoppingItemsByCartID = async (cartID) => {
    try{
        return await ChoppingItem.find({cartID});
    }catch(err){ console.log(err) }
}


//=================== ADD CHOPPING ITEM
const addChoppingItem = async (item) => {
    try{
        const isExist = await isItemExist(item);
        if( !isExist ){
            // const id = item.productID;
            // const itemPrice = await getProductPriceByID(id);
            // item.totalPrice = itemPrice*item.count;
            const newItem = new ChoppingItem(item);
            return await newItem.save();
        }else{
            // console.log(item);
            const currentPrice = await getProductPriceByID(item.productID);
            const currentCount = isExist.count+1;
            const newTotal = currentPrice*currentCount; 
            let params = {
                count: isExist.count+1,
                totalPrice: newTotal
            }
            updateChopingItem(isExist._id, params)
        }
    }catch(err){  console.log(err)  }
}

//==================== DELETE CHOPPING CART BY ID
const deleteChoppingItem = async (id) => {
    try{
        return await ChoppingItem.deleteOne({_id: id});
    }catch(err){ console.log(err) }
}


//==================== UPDATE CART (id, params)
const updateChopingItem = async (id, params) => {
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
        const itemExist = await ChoppingItem.findOne({cartID: item.cartID, productID: item.productID});
        if(itemExist){
            return itemExist
        }else{
            return false
        }
    }catch(err){ console.log(err) }
}

const decrementItemCount = async (item) => {
    try{
        const isExist = await isItemExist(item);
        if( !isExist ){
            const newItem = new ChoppingItem(item);
            return await newItem.save();
        }else{
            const currentPrice = await getProductPriceByID(item.productID);
            const currentCount = isExist.count-1;
            if(currentCount == 0){
                return await deleteChoppingItem(item._id);
            }
            const newTotal = currentPrice*currentCount; 
            let params = {
                count: currentCount,
                totalPrice: newTotal
            }
            return await updateChopingItem(isExist._id, params)
        }
    }catch(err){ console.log(err) }
}


module.exports = {
    addChoppingItem,
    deleteChoppingItem,
    updateChopingItem,
    isItemExist,
    getAllChoppingItemsByCartID,
    decrementItemCount
}

