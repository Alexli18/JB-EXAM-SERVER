const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isValid } = require('../middlewares/isUserValid');


//================== USER SERVICE
const {
    addUser,
    isUserExist,
    updateUser,
    deleteUser
} = require('../services/user-service');




router.post('/login', passport.authenticate('local'), async (req, res) => {
    try{
        res.send(req.session.passport);
    }catch(err){
        res.send(err);
    }
});


// //================== isValidUser MD
router.get('/valid', isValid, (req ,res) => {
    res.send(req.session);
})

router.get('/logout', async (req, res) => {
    try{
        req.session.destroy(err=>{
            if(err){res.send("cant destroy session")}
        })
        res.send({status:"log out succees!!!"});
    }catch(err){ res.send(err) }
})

router.post('/registrate', async (req, res) => {
    try {
        const user = req.body.user;
        user.role = "user"
        const userHandler = await isUserExist(user); 
        if(!userHandler){
            await addUser(user);
            res.send({status: 200})
        }else{
            res.send("User exist")
        }
    } catch (err) {
        res.send(err);
    }
})





module.exports = router;