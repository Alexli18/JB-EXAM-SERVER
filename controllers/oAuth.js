const express = require('express');
const router = express.Router();
const passport = require('passport');
const authSuccess = require('../middlewares/authSuccess');

//================= Social Auth
const networks = ['google', 'facebook'];//, ADD SOCIAL EASY
networks.forEach(network => {

    router.get(`/registration/${network}`, (request, response) => {
        passport.authenticate(network, {
            scope:'email'
        })(request, response);
    });

    router.get(`/registration/${network}/callback`, (request, response) => {
        passport.authenticate(network, {
            successRedirect: '/api/oAuth/auth-success'
        })(request, response);
    });
});

router.get('/auth-success', authSuccess.get);


module.exports = router;