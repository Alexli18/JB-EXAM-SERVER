const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middlewares/isUserAdmin');

//============= CATEGORY SERVICE
const { addCategory, deleteCategory, updateCategory, isCategoryExist, getAllCategories} = require('../services/category-service');


//================ GET ALL CATEGORIES
router.get('/all', async (req, res) => {
    try{
        const data = await getAllCategories();
        res.send(data);
    }catch(err){ res.send({status: 400, err}) }
})

//================= ADD CATEGORY
router.post('/add', isAdmin, async (req, res)=>{
    try{
        const isExist = await isCategoryExist(req.body);
        if( !isExist ){
            await addCategory(req.body);
            res.sendStatus(200); 
        }else{
            res.send({status: 400, isCategoryExist: tru});
        }
    }catch(err){ res.send({status: 400, err}) }
});

//============== DELETE CATEGORY
router.post('/delete', isAdmin, async (req, res) => {
    try{
        const { id } = req.body;
        await deleteCategory(id);
        res.sendStatus(200);
    }catch(err){ res.send({status: 400, err}) }
});

//============== UPDATE CATEGORY
router.post('/update', isAdmin, async (req, res) => {
    try{
        const isExist = await isCategoryExist(req.body);
        const { id, params } = req.body;
        if( !isExist ){
            await updateCategory(id, params);
            res.send({status: 200}); 
        }else{
            res.sendStatus({status: 400, isCategoryExist: false});
        }
    }catch(err){ res.send({status: 400, err}) }
});


module.exports = router
