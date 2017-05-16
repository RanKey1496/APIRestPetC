var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var morgan = require('morgan');
var api = require('./routes');
var cors = require('cors');

var User = require('./models/user');
var Pet = require('./models/pet');
var PetShop = require('./models/pet_shop');
var Vaccionation = require('./models/vaccinations');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(expressValidator({
	customValidators: {
		isValidUser: function(id){
			return new Promise(function(resolve, reject) {
                User.findById(id, function(err, results) { 
                    if(err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
		},
		isValidPet: function(id){
			return new Promise(function(resolve, reject) {
                Pet.findById(id, function(err, results) { 
                    if(err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
		},
		isValidPetShop: function(id){
			return new Promise(function(resolve, reject) {
                PetShop.findById(id, function(err, results) { 
                    if(err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
		},
		isValidVaccionation: function(id){
			return new Promise(function(resolve, reject) {
                Vaccionation.findById(id, function(err, results) { 
                    if(err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
		}
	}
}));
app.use('/pictures', express.static(__dirname + '/uploads'));

app.use('/', api);
module.exports = app;