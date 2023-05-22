const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//Setting of DB config
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo'); 
// const sassMiddleware = require('node-sass');

// app.use(sassMiddleware({
//     src: './assests/scss',
//     dest: '/assets',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

//seting of encoding and cookie parser
app.use(express.urlencoded());
app.use(cookieParser());

const sign_up = require('./models/users');

//include express ejs layouts
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

//set up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

//mongo store is used to store session cookie
app.use(session({
    name: 'codial',
    secret: 'blahsomething',
    saveUninitialized : false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store : new MongoStore({
            mongoUrl: 'mongodb://127.0.0.1/users',
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes/index'));

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`);
    }
    console.log(`Server is up and running on PORT: ${port}`);
});