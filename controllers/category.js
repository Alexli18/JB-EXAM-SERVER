const express = require('express');
const router = express.Router();

//============= CATEGORY SERVICE
const { addCategory, deleteCategory, updateCategory, isCategoryExist } = require('../services/category-service');



//================= ADD CATEGORY
router.post('/add', async (req, res)=>{
    try{
        const isExist = await isCategoryExist(req.body);
        if( !isExist ){
            await addCategory(req.body);
            res.sendStatus(200); 
        }
        res.sendStatus(400);
    }catch(err){ res.sendStatus(400) }
});

//============== DELETE CATEGORY
router.post('/delete', async (req, res) => {
    try{
        const { id } = req.body;
        await deleteCategory(id);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});

//============== UPDATE CATEGORY
router.post('/update', async (req, res) => {
    try{
        const { id, params } = req.body;
        await updateCategory(id, params);
        res.sendStatus(200);
    }catch(err){ res.sendStatus(400) }
});


module.exports = router
