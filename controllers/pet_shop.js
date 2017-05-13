var PetShop = require('../models/pet_shop');

function getPetShops(req, res){
	return res.status(200).json({ success: true, 
				message: { 
					message: 'Success'
				}
			});
}

function addPetShop(req, res){

}

function updatePetShop(req, res){

}

function deletePetShop(req, res){

}

function getPetShopByCity(req, res){

}

function getPetShopByGeo(req, res){

}

function getPetShop(req, res){

}

module.exports = {
    getPetShops,
    addPetShop,
    updatePetShop,
    deletePetShop,
    getPetShopByCity,
    getPetShopByGeo,
    getPetShop
}