// Importing dependencies
'use strict';
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
//const bodyParser = require('body-parser');
const config = require('./config');
const admin = require('./admin');

// Adding Routes
const signUp = require('./routes/signUp');
const login = require('./routes/login');

// Defining the port
var port = process.env.PORT

// instantiating the app
const app = express()

// Setting the view engine
app.set('view engine', 'ejs')
app.engine("html", require("ejs").renderFile)

// Defining the statics (css, js, imgs ... etc) public folder
app.use(express.static('views'));

// Giving the server access to user input
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// for logging everything in the terminal
app.use(logger('dev'))

// Using routes
app.use('/signUp', signUp);
app.use('/login', login);

// Defining the routes
app.get('/', (req, res) => {
    res.render('index.html')
})

// Making the app listinig for any request
app.listen(port, function(){
    console.log('App is running http://localhost:' + port)
})

