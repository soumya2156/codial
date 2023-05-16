const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//Setting of DB config
const db = require('./config/mongoose');

//seting of encoding and cookie parser
app.use(express.urlencoded());
app.use(cookieParser());

const sign_up = require('./models/users');

//include express ejs layouts
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

//use express router
app.use('/', require('./routes/index'));

//set up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port , function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`);
    }
    console.log(`Server is up and running on PORT: ${port}`);
});