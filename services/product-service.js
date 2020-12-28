const mongoose = require('mongoose');
const ProductSchema = require('../models/category');

const Product = mongoose.model('User', ProductSchema);

const addProduct = async (product) => {
    try{
        const newProduct = new Product(product);
        await newProduct.save()
    }catch(err){
        console.log(err)
    }
}




module.exports = {
    addProduct
}


