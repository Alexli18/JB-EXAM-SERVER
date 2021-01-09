const express = require('express');
const router = express.Router();

const {
    addChoppingItem,
    deleteChoppingItem,
    updateChopingItem,
    isItemExist,
    getAllChoppingItemsByCartID,
    decrementItemCount
} = require('../services/choping-item-service');


//======================= GET ALL CHOPPING ITEMS BY CART ID
router.post('/all', async (req, res) => {
    try{
        const { cartID } = req.body;
        const items = await getAllChoppingItemsByCartID(cartID);
        res.send(items);
    }catch(err){ res.sendStatus(400) }
});


//====================== ADD CHOPPING ITEM
router.post('/add', async (req, res) => {
    try{
        const { cartID } = req.body;
        await addChoppingItem(req.body);
        const items = await getAllChoppingItemsByCartID(cartID);
        res.send(items);
    }catch(err){ res.send({status: 400, err}) }
});

router.post('/decrement', async ( req, res) => {
    try{
        const { cartID } = req.body;
        await decrementItemCount(req.body);
        const items = await getAllChoppingItemsByCartID(cartID);
        res.send(items);
    }catch(err){ res.send({status: 400, err}) }
})

//======================= DELETE CHOPPING ITEM
router.post('/delete', async (req, res) => {
    try{
        const { id } = req.body;
        await deleteChoppingItem(id);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});

//=====================UPDATE CART ITEM
router.post('/update', async (req, res) => {
    try{
        const { id, params } = req.body;
        await updateChopingItem(id, params);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});


module.exports = router;