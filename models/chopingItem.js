const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const ChopingItem = new Schema({
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    cartID: {
        type: Schema.Types.ObjectId,
        ref: 'ChopingCart'
    },
    count: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    productName: {
        type: String
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



module.exports = ChopingItem