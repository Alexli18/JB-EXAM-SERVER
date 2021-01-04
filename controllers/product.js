const express = require('express');
const router = express.Router();

//====================== PRODUCT SERVICE
const { getAllProducts, addProduct, deleteProduct, isProductExist, updateProduct } = require('../services/product-service');

//===================== GET ALL PRODUCTS
router.get('/all', async (req, res) => {
    try{
        const data = await getAllProducts();
        res.send(data);
    }catch(err){
        res.sendStatus(400)
    }
});

//==================== ADD NEW PRODUCT
router.post('/add', async (req, res) => {
    try{
        const product = await isProductExist(req.body);
        if( !product ){
            await addProduct(req.body);
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    }catch(err){
        res.sendStatus(400);
    }
});

//==================== DELETE PRODUCT
router.post('/delete', async (req, res) => {
    try{
        const { id } = req.body;
        await deleteProduct(id);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
 });



//==================== UPDATE PRODUCT
router.post('/update', async (req, res) => {
    try{
        const { id, params } = req.body;
        await updateProduct(id, params);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});



module.exports = router;