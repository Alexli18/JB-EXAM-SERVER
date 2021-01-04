const mongoose = require('mongoose');
const ProductSchema = require('../models/product');

const Product = mongoose.model('User', ProductSchema);

const addProduct = async (product) => {
    try{
        const newProduct = new Product(product);
        await newProduct.save()
    }catch(err){
        console.log(err)
    }
}


const deleteProduct = async (id) => {
    return await Product.deleteOne({_id: id});
}

const updateProduct = async (id, params) => {
    return await Product.updateOne(
        {_id: id},
        {$set: params}
    );
}

const isProductExist = async (product) => {
    const { productName } = product;
    const productExist = await Category.findOne({productName});
    if(productExist){
        return productExist
    }else{
        return false
    }
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    isProductExist
}


