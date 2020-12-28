const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        unique: true,
        required: true
    },
    categoryID : {
        type: Schema.Types.ObjectId,
        ref: 'Category' 
    },
    price: {
        type: Number
    },
    img: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = ProductSchema;