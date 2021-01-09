const mongoose = require('mongoose');
const BillSchema = require('../models/bill');


const Bill = mongoose.model('Bill', BillSchema);

const addBill = async (bill) => {
    try{
        const newBill = new Bill(bill);
        return await newBill.save();
    }catch(err){ console.log(err) }
}


module.exports = {
    addBill
}