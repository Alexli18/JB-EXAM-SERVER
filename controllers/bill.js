const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isValid } = require('../middlewares/isUserValid');
const { addBill } = require('../services/bill-service');

router.post('/add', isValid, async (req, res) => {
    try{
        const shippingDateValid = await addBill(req.body)
        if(shippingDateValid){
            res.send({status: 200})
        }else{
            res.send({status: 200, shippingDateError: true})
        }
    }catch(err){ res.send({status: 400, err}) }
})


module.exports = router;