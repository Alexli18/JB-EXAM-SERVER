const config = {};

config.port = 4000;

config.mongoose = {
    "uri": "mongodb://localhost:27017/online-shop",
    "options": {
        "keepAlive": 1,
        "autoIndex": false,
        "useNewUrlParser": true,
        "poolSize" : 10
    }
};

config.session = {
    "secret": "AlexSecret",
    "key": "sid",
    "cookie": {
        "path": "/",
        "httpOnly": true,
        "maxAge": 1000 * 60 * 60
    }
};

config.oauth = {
    'facebookAuth' : {
        'clientID': '401816164206604',
        'clientSecret': 'ed8f2bfc4f18fb59c12d7644b6ebb3bb',
        'callbackURL': 'http://localhost:4000/api/oAuth/registration/facebook/callback'
    },
    'googleAuth' : {
        'clientID': '1025905933738-taeg9m5kllb86rta0or8rulm0nrk7bmg.apps.googleusercontent.com',
        'clientSecret': 'hqq1cXEimIrr05Zij8RfAKxc',
        'callbackURL': 'http://localhost:4000/api/oAuth/registration/google/callback'
    }
};


module.exports = config;
