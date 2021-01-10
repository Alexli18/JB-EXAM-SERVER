const mongoose = require('mongoose');
const BillSchema = require('../models/bill');


const Bill = mongoose.model('Bill', BillSchema);

const addBill = async (bill) => {
    try{
        const dateValidation =  await isValidDate(bill)
        if(dateValidation){
            const newBill = new Bill(bill);
            return await newBill.save();
        }else{
            return false
        }
    }catch(err){ console.log(err) }
}

const isValidDate = async (bill) => {
    try{
        const { shippingDate } = bill;
        const ordersToDate =  await Bill.find({shippingDate});
    if(ordersToDate.length>=3){
        return false
    }else{
        return true
    }
    }catch(err){ console.log(err) }
}

module.exports = {
    addBill
}