const express = require('express');
const router = express.Router();

//====================== PRODUCT SERVICE
const {
    getAllProducts,
    addProduct,
    deleteProduct,
    isProductExist,
    updateProduct,
    getProductsByCategoryID
} = require('../services/product-service');




router.post('/productsByCategory', async (req, res) => {
    try{
        const { categoryID } = req.body;
        const response = await getProductsByCategoryID(categoryID);
        res.send(response);
    }catch(err){ res.send({status:400, err}) }
})

//===================== GET ALL PRODUCTS
router.get('/all', async (req, res) => {
    try {
        const data = await getAllProducts();
        res.send(data);
    } catch (err) { res.send({status:400, err}) }
});

//==================== ADD NEW PRODUCT
router.post('/add', async (req, res) => {
    try {
        const product = await isProductExist(req.body);
        if (!product) {
            await addProduct(req.body);
            res.send({status: 200});
        } else {
            res.send({status: 400, isProductExist: true});
        }
    } catch (err){ res.send({status:400, err}) }
});

//==================== DELETE PRODUCT
router.post('/delete', async (req, res) => {
    try {
        const {
            id
        } = req.body;
        await deleteProduct(id);
        res.sendStatus(200);
    } catch (err) { res.send({status:400, err}) }
});



//==================== UPDATE PRODUCT
router.post('/update', async (req, res) => {
    try {
        const product = await isProductExist(req.body);
        const {
            id,
            params
        } = req.body;
        if (!product) {
            await updateProduct(id, params);
            res.send({status: 200});
        } else {
            res.sendStatus(400);
        }
    } catch (err) { res.send({status:400, err}) }
});



module.exports = router;