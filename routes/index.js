var express = require('express');
var UserController= require('../controllers/user');
var PetController=require('../controllers/pet');
var api = express.Router();
var multer = require('multer');

var util = require('../transexual/util');

api.get('/', function(req, res){
	return res.status(200).send({message: 'Entraste a la API'});
});

api.post('/signup', UserController.signup);
api.post('/signin', UserController.signin);

api.use(UserController.tokenCheck);
api.get('/authenticated', UserController.getAuthenticatedUser);
api.get('/adoption/pets', PetController.getAvailablePets);
//api.post('/upload', util.saveFile, UserController.uploadPicture);

module.exports = api;