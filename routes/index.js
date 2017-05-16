var express = require('express');

var UserController= require('../controllers/user');
var PetController = require('../controllers/pet');
var PetShopController = require('../controllers/pet_shop');
var VaccinationsController = require('../controllers/vaccinations');
var AdoptionsController = require('../controllers/adoptions');

var PetsValidator = require('../validations/pets');
var PetShopsValidator = require('../validations/pet_shops');
var VaccinationsValidator = require('../validations/vaccinations');
var UsersValidator = require('../validations/users');

var api = express.Router();
var multer = require('multer');

//var util = require('../transversal/util');

api.get('/', function(req, res){
	return res.status(200).send({message: 'Entraste a la API'});
});

api.post('/signup', UsersValidator.validateUserData, UserController.signup);
api.post('/signin', UsersValidator.validateLogin, UserController.signin);

api.use(UsersValidator.validateToken, UserController.tokenCheck);
api.get('/authenticated', UserController.getAuthenticatedUser);

//Mascotas
api.get('/mascotas/:id', PetsValidator.validateId, PetController.getPet);
api.get('/mascotas', PetController.getPets);
api.post('/mascotas', PetsValidator.validatePetData, PetController.addPet);
api.patch('/mascotas', PetsValidator.validateUpdate, PetController.updatePet);
api.delete('/mascotas/:id', PetsValidator.validateId, PetController.deletePet);

//Información de veterianarias
api.get('/veterinarias', PetShopController.getPetShops);
api.get('/veterinarias/:id', PetShopsValidator.validateId, PetShopController.getPetShop);
api.post('/veterinarias', PetShopsValidator.validatePetShopData, PetShopController.addPetShop);
api.patch('/veterinarias', PetShopsValidator.validateUpdate, PetShopController.updatePetShop);
api.delete('/veterinarias/:id', PetShopsValidator.validateId, PetShopController.deletePetShop);
api.get('/veterinarias/ciudad/:city', PetShopsValidator.validateCity, PetShopController.getPetShopByCity);
api.get('/veterinarias/geo/:latitude/:longitude', PetShopsValidator.validateGeo, PetShopController.getPetShopByGeo);

//Vacunaciones
api.get('/vacunaciones/:id', VaccinationsValidator.validateId, VaccinationsController.getVaccinations);
api.post('/vacunaciones', VaccinationsValidator.validateVaccionationData, VaccinationsController.addVaccination);
api.patch('/vacunaciones', VaccinationsValidator.validateUpdate, VaccinationsController.updateVaccination);
api.delete('/vacunaciones/:id', VaccinationsValidator.validateId, VaccinationsController.deleteVaccination);

//Adopciones
api.get('/adopciones', AdoptionsController.getAvailablePets);
api.get('/adopciones/geo/:location/:latitude', PetShopsValidator.validateGeo, AdoptionsController.getPetsByLocation);

//api.post('/upload', util.saveFile, UserController.uploadPicture);

module.exports = api;