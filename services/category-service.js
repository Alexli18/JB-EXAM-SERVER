const mongoose = require('mongoose');
const CategorySchema = require('../models/category');


const Category = mongoose.model('Category', CategorySchema);


const getAllCategories = async () => {
    try{
        return await Category.find({});
    }catch(err){ console.log(err) }
}

const addCategory = async (category) => {
    try{
        const newCategory = new Category(category);
        await newCategory.save();

    }catch(err){
        console.log(err)
    }
}

const deleteCategory = async (id) => {
    try{
        return await Category.deleteOne({_id: id});
    }catch(err){ console.log(err) }
}

const updateCategory = async (id, params) => {
    try{
        return await Category.updateOne(
            {_id: id},
            {$set: params}
        );
    }catch(err){ console.log(err) }
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
    getAllCategories,
    addCategory,
    deleteCategory,
    updateCategory,
    isCategoryExist
}