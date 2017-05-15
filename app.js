var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var api = require('./routes');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator());
app.use('/pictures', express.static(__dirname + '/uploads'));

app.use('/', api);
module.exports = app;