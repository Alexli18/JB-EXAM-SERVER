const express = require('express');
const router = express.Router();
const passport = require('passport');



//================== USER SERVICE
const {
    addUser,
    isUserExist,
    updateUser,
    deleteUser
} = require('../services/user-service');




router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(req.session);
});

router.get('/logout', (req, res) => {
    req.session.destroy(err=>{
        if(err){res.send("cant destroy session")}
    })
    res.send("log out succees!!!");
})

router.post('/registrate', async (req, res) => {
    try {
        const user = req.body;
        user.role = "user"
        const userHandler = await isUserExist(user); 
        if(!userHandler){
            await addUser(user);
            res.send("User created")
        }else{
            res.send("User exist")
        }
    } catch (err) {
        res.send(err);
    }
})





module.exports = router;