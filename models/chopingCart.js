const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;


const ChopingCartSchema = new Schema({
    clientID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


module.exports = ChopingCartSchema;