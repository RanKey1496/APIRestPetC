var express = require('express');
var UserController= require('../controllers/user');
var PetController = require('../controllers/pet');
var PetShopController = require('../controllers/pet_shop');
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

//Veterinarias
api.get('/veterinarias', PetShopController.getPetShops);
api.post('/veterinarias', PetShopController.addPetShop);
api.patch('/veterinarias', PetShopController.updatePetShop);
api.delete('/veterinarias/:id', PetShopController.deletePetShop);
api.patch('/veterinarias/:city', PetShopController.getPetShopByCity);
api.post('/veterinarias/:geo', PetShopController.getPetShopByGeo);
api.patch('/veterinarias/:id', PetShopController.getPetShop);

//api.post('/upload', util.saveFile, UserController.uploadPicture);

module.exports = api;