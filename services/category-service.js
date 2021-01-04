const mongoose = require('mongoose');
const CategorySchema = require('../models/category');


const Category = mongoose.model('Category', CategorySchema);


const addCategory = async (category) => {
    try{
        const newCategory = new Category(category);
        await newCategory.save();

    }catch(err){
        console.log(err)
    }
}

const deleteCategory = async (id) => {
    return await Category.deleteOne({_id: id});
}

const updateCategory = async (id, params) => {
    return await Category.updateOne(
        {_id: id},
        {$set: params}
    );
}

const isCategoryExist = async (category) => {
    const { categoryName } = category;
    const categoryExist = await Category.findOne({categoryName});
    if(categoryExist){
        return categoryExist
    }else{
        return false
    }
}

module.exports = {
    addCategory,
    deleteCategory,
    updateCategory,
    isCategoryExist
}