const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })




module.exports = CategorySchema;