var express = require('express');
var UserController= require('../controllers/user');
var PetController = require('../controllers/pet');
var PetShopController = require('../controllers/pet_shop');
var VaccinationsController = require('../controllers/vaccinations');
var AdoptionsController = require('../controllers/adoptions');
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

//Mascotas
api.get('/mascotas/:id', PetController.getPet);
api.get('/mascotas', PetController.getPets);
api.post('/mascotas', PetController.addPet);
api.patch('/mascotas', PetController.updatePet);
api.delete('/mascotas/:id', PetController.deletePet);

//Información de veterianarias
api.get('/veterinarias', PetShopController.getPetShops);
api.post('/veterinarias', PetShopController.addPetShop);
api.patch('/veterinarias', PetShopController.updatePetShop);
api.delete('/veterinarias/:id', PetShopController.deletePetShop);
api.patch('/veterinarias/:city', PetShopController.getPetShopByCity);
api.post('/veterinarias/:geo', PetShopController.getPetShopByGeo);
api.patch('/veterinarias/:id', PetShopController.getPetShop);

//Vacunaciones
api.get('/vacunaciones', VaccinationsController.getVaccinations);
api.post('/vacunaciones', VaccinationsController.addVaccination);
api.patch('/vacunaciones', VaccinationsController.updateVaccination);
api.delete('/vacunaciones/:id', VaccinationsController.deleteVaccination);

//Adopciones
api.get('/adopciones', AdoptionsController.getAvailablePets);
api.get('/adopciones/:location/:latitude', AdoptionsController.getPetsByLocation);

//api.post('/upload', util.saveFile, UserController.uploadPicture);

module.exports = api;