const express = require('express');
const router = express.Router();

//====================== CHOPPING CART SERVICE
const {
    getAllChoppingCarts,
    addChopingCart,
    deleteChopingCart,
    updateChopingCart,
    isCartExist
} = require('../services/choping-cart-service');


//======================= GET ALL CARTS 
router.get('/all', async (req, res) => {
    try {
        // filter by user id
        const choppingCarts = await getAllChoppingCarts(req.user);
        res.send(choppingCarts);
    } catch (err) {
        res.sendStatus(400)
    }
});

//========================== ADD NEW CART
router.post('/add', async (req, res) => {
    try{
        const isExist = await isCartExist(req.body);
        if(!isExist){
            await addChopingCart(req.body);
            const choppingCarts = await getAllChoppingCarts(req.user);
            res.send(choppingCarts);
        }else{
            res.send({status: 400, err: 'user cart exist'});
        }
    }catch(err){ res.send({status: 400, err}) }
});


//====================== DELETE CART
router.post('/delete', async (req, res) => {
    try{
        const isExist = await isCartExist(req.body);
        const { id } = req.body;
        if(isExist){
            await deleteChopingCart(id);
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    }catch(err){ res.sendStatus(400) }
});


//======================= UPDATE CART
router.post('/update', async (req, res) => {
    try{
        const { id, params } = req.body;
        const isExist = await isCartExist({id});
        if(isExist){
            await updateChopingCart(id, params);
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    }catch(err){ res.sendStatus(400) }
});



module.exports = router