var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var cors = require('cors');


var route = require('./route');



app.use(express.static(__dirname+'/front'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(CookieParser());


app.use(route);


module.exports = app;
