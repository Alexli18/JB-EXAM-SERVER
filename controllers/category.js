const express = require('express');
const router = express.Router();

//============= CATEGORY SERVICE
const { addCategory, deleteCategory, updateCategory, isCategoryExist, getAllCategories} = require('../services/category-service');


//================ GET ALL CATEGORIES
router.get('/all', async (req, res) => {
    try{
        const data = await getAllCategories();
        res.send(data);
    }catch(err){ res.sendStatus(400) }
})

//================= ADD CATEGORY
router.post('/add', async (req, res)=>{
    try{
        const isExist = await isCategoryExist(req.body);
        if( !isExist ){
            await addCategory(req.body);
            res.sendStatus(200); 
        }else{
            res.sendStatus(400);
        }
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
        const isExist = await isCategoryExist(req.body);
        const { id, params } = req.body;
        if( !isExist ){
            await updateCategory(id, params);
            res.sendStatus(200); 
        }else{
            res.sendStatus(400);
        }
    }catch(err){ res.sendStatus(400) }
});


module.exports = router
