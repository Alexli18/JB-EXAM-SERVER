const express = require('express');
const router = express.Router();

const {
    addChoppingItem,
    deleteChoppingItem,
    updateChopingCart,
    isItemExist,
    getAllChoppingItemsByCartID
} = require('../services/choping-item-service');

router.get('/all', async (req, res) => {
    try{
        const { cartID } = req.body;
        const items = await getAllChoppingItemsByCartID(cartID);
        res.send(items);
    }catch(err){ res.sendStatus(400) }
});

router.post('/add', async (req, res) => {
    try{
        await addChoppingItem(req.body);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});


router.post('/delete', async (req, res) => {
    try{
        const { id } = req.body;
        await deleteChoppingItem(id);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});


router.post('/update', async (req, res) => {
    try{
        const { id, params } = req.body;
        await updateChopingCart(id, params);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});


module.exports = router;