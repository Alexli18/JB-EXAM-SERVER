const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    clientID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cartID: {
        type: Schema.Types.ObjectId,
        ref: 'ChopingCart'
    },
    totalPrice: {
        type: Number
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    shippingDate: {
        type: Date
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    lastCreditNumber: {
        type: Number
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

module.exports = BillSchema;