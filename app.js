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

const {isValid} = require('./middlewares/isUserValid');
const {isAdmin} = require('./middlewares/isUserAdmin');

// const LocalStrategy = require('passport-local').Strategy;

app.use(express.static('public'));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(helmet());
// //================= Templates
// app.set('views', __dirname + '/templates');
// app.set('view engine', 'ejs');
// app.set('view options', {compileDebug: false, self: true, cache: true});
// app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/auth', loginController);
app.use('/oAuth', oAuthController);

// //================== isValidUser MD
app.get('/', isValid, (req ,res) => {
    res.send(req.session);
})

app.use('/category', isAdmin, categoryController);
app.use('/product', isAdmin, productController);
app.use('/cart', isValid, cartController);
app.use('/cart-item', isValid, cartItemController )



//================= Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(502);
});


app.listen(Config.port, () => {
    console.log(`Listening on port ${Config.port}!`);
});