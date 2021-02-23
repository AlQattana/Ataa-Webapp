// Importing dependencies
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

// instantiating the app
const app = express()

// Defining the port
var port = process.env.PORT || 3000

// Setting the view engine
app.set('view engine', 'ejs')
app.engine("html", require("ejs").renderFile)

// Defining the statics (css, js, imgs ... etc) public folder
app.use(express.static('public'));

// Giving the server access to user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

// for logging everything in the terminal
app.use(logger('dev'))

// Defining the routes
app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/index.html', (req, res) => {
    res.render('index.html')
})

app.get('/login.html', (req, res) => {
    res.render('login.html')
})

app.get('/signUp.html', (req, res) => {
    res.render('signUp.html')
})

// Making the app listinig for any request
app.listen(port, function(){
    console.log('App is running on port ' + port)
})

