// Importing dependencies
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");
//const csrf = require("csurf");
const config = require('./config');
const admin = require('./admin');


// Adding Routes
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const index = require('./routes/index');
const searchCharity = require('./routes/searchCharity');
const adminPage = require('./routes/adminPage');
const banAccount = require('./routes/banAccount');
const confirmCharity = require('./routes/confirmCharity');
const editCharityInformation = require('./routes/editCharityInformation');
const historyDonationRequest = require("./routes/historyDonationRequest");
const searchDonationRequest = require('./routes/searchDonationRequest');
const donation = require('./routes/donation')

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
app.use(cookieParser());


// for logging everything in the terminal
app.use(logger('dev'))

app.all("*", (req, res, next) => {
    if(!res.cookie)
        res.cookie("UID", "Undefined");
    next()
});

// Using routes
app.use('/signUp', signUp);
app.use('/login', login);
app.use('/index', index);
app.use('/searchCharity', searchCharity);
app.use('/adminPage', adminPage);
app.use('/banAccount', banAccount);
app.use('/confirmCharity', confirmCharity);
app.use('/editCharityInformation', editCharityInformation);
app.use('/historyDonationRequest', historyDonationRequest);
app.use("/searchDonationRequest", searchDonationRequest);
app.use("/donation", donation);



// Defining the routes
app.get('/', (req, res) => {
    res.render('index')
})

// Making the app listinig for any request
app.listen(port, function(){
    console.log('App is running http://localhost:' + port)
})