const express = require('express');
const session = require('express-session');

var sessionMiddleware = express.session({
    //session configurations
});

function sessionHandler(req, res, next) { sessionMiddleware(req, res, next); }