const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isValid } = require('../middlewares/isUserValid');
const { addBill } = require('../services/bill-service');

router.post('/add', isValid, async (req, res) => {
    try{
        await addBill(req.body);
        res.send({status: 200})
    }catch(err){ res.send({status: 400, err}) }
})


module.exports = router;