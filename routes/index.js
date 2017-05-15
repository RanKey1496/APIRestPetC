var express = require('express');

var UserController= require('../controllers/user');
var PetController = require('../controllers/pet');
var PetShopController = require('../controllers/pet_shop');
var VaccinationsController = require('../controllers/vaccinations');
var AdoptionsController = require('../controllers/adoptions');

var api = express.Router();
var multer = require('multer');

var MascotasValidator = require('../validations/mascotas');
//var util = require('../transversal/util');

api.get('/', function(req, res){
	return res.status(200).send({message: 'Entraste a la API'});
});

api.post('/signup', UserController.signup);
api.post('/signin', UserController.signin);

api.use(UserController.tokenCheck);
api.get('/authenticated', UserController.getAuthenticatedUser);

//Mascotas
api.get('/mascotas/:id', MascotasValidator.validarId, PetController.getPet);
api.get('/mascotas', PetController.getPets);
api.post('/mascotas', MascotasValidator.validarPetData, PetController.addPet);
api.patch('/mascotas', MascotasValidator.validarUpdate, PetController.updatePet);
api.delete('/mascotas/:id', MascotasValidator.validarId, PetController.deletePet);

//Información de veterianarias
api.get('/veterinarias', PetShopController.getPetShops);
api.get('/veterinarias/:id', PetShopController.getPetShop);
api.post('/veterinarias', PetShopController.addPetShop);
api.patch('/veterinarias', PetShopController.updatePetShop);
api.delete('/veterinarias/:id', PetShopController.deletePetShop);
api.get('/veterinarias/ciudad/:city', PetShopController.getPetShopByCity);
api.get('/veterinarias/geo/:latitude/:longitude', PetShopController.getPetShopByGeo);

//Vacunaciones
api.get('/vacunaciones', VaccinationsController.getVaccinations);
api.post('/vacunaciones', VaccinationsController.addVaccination);
api.patch('/vacunaciones', VaccinationsController.updateVaccination);
api.delete('/vacunaciones/:id', VaccinationsController.deleteVaccination);

//Adopciones
api.get('/adopciones', AdoptionsController.getAvailablePets);
api.get('/adopciones/geo/:location/:latitude', AdoptionsController.getPetsByLocation);

//api.post('/upload', util.saveFile, UserController.uploadPicture);

module.exports = api;