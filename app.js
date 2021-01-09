const express = require('express');
const session = require('express-session');
const common = require('./common');
const Config = require('./libs/config');
const app = express();
const bodyParser = require('body-parser');
const loginController = require('./controllers/auth');
const oAuthController = require('./controllers/oAuth');
const categoryController = require('./controllers/category');
const productController = require('./controllers/product');
const cartController = require('./controllers/chopping-cart');
const cartItemController = require('./controllers/chopping-item');
const billController = require('./controllers/bill');
const cors = require('cors');

const {isValid} = require('./middlewares/isUserValid');
const {isAdmin} = require('./middlewares/isUserAdmin');



app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//================= Session
const sessionStore = require('./libs/sessionStore');
app.use(session({
    secret: Config.session.secret,
    key: Config.session.key,
    cookie: Config.session.cookie,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));

//================= Social Auth
const passport = require('passport');
require('./libs/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//================= Common middleware
app.use(common.commonMW);


//================= Login
app.use('/api/auth', loginController);
app.use('/api/oAuth', oAuthController);



app.use('/api/category', isValid, categoryController);
app.use('/api/product', isValid, productController);
app.use('/api/cart', isValid, cartController);
app.use('/api/cart-item', isValid, cartItemController );
app.use('/api/bill', isValid, billController );



//================= Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(502);
});


app.listen(Config.port, () => {
    console.log(`Listening on port ${Config.port}!`);
});