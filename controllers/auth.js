const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isValid } = require('../middlewares/isUserValid');
const { createHashedPassword } = require('../utils/utils')


//================== USER SERVICE
const {
    addUser,
    isUserExist,
} = require('../services/user-service');




router.post('/login', passport.authenticate('local'), async (req, res) => {
    try{
        res.send(req.session.passport);
    }catch(err){
        res.send({status: 400, err});
    }
});


// //================== isValidUser MD
router.get('/valid', isValid, async (req ,res) => {
    try{
        res.send(req.session);
    }catch(err){ res.send({status:400, err}) }
})

router.get('/logout', async (req, res) => {
    try{
        req.session.destroy(err=>{
            if(err){res.send("cant destroy session")}
        })
        res.send({status:"log out succees!!!"});
    }catch(err){ res.send({status:400, err}) }
})

router.post('/registrate', async (req, res) => {
    try {
        const user = req.body.user;
        user.role = "admin"
        const userHandler = await isUserExist(user); 
        if(!userHandler){
            user.password = createHashedPassword(user.password);
            await addUser(user);
            res.send({status: 200})
        }else{
            res.send({status: 200, userExist: true})
        }
    } catch(err){ res.send({status:400, err}) }
})





module.exports = router;