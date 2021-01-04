const mongoose = require('mongoose');
const ProductSchema = require('../models/product');

const Product = mongoose.model('Product', ProductSchema);


//=========== GET ALL PRODUCTS
const getAllProducts = async () => {
    try{
        return await Product.find({});
    }catch(err){ console.log(err) }
}


//======================= ADD NEW PRODUCT
const addProduct = async (product) => {
    try{
        const isExist = await isProductExist(product);
        if( !isExist ){
            const newProduct = new Product(product);
            await newProduct.save()
        }else{
            return false;
        }
    }catch(err){
        console.log(err)
    }
}

//==================== DELETE PRODUCT BY ID
const deleteProduct = async (id) => {
    try{
        return await Product.deleteOne({_id: id});
    }catch(err){ console.log(err) }
}


//==================== UPDATE PRODUCT (id, params)
const updateProduct = async (id, params) => {
    try{
        return await Product.updateOne(
            {_id: id},
            {$set: params}
        );
    }catch(err){ console.log(err) }
}

//===================== CHECK IF PRODUCT EXIST
const isProductExist = async (product) => {
    try{
        const { productName } = product;
        const productExist = await Product.findOne({productName});
        if(productExist){
            return productExist
        }else{
            return false
        }
    }catch(err){ console.log(err) }
}

//====================== GET PRODUCT PRICE BY ID
const getProductPriceByID = async (id) => {
    try{
        const product = await Product.findById(id);
        return product.price;
    }catch(err){ console.log(err) }
}

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    isProductExist,
    getProductPriceByID
}


