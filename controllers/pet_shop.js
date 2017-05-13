var PetShop = require('../models/pet_shop');
var GeoPoint = require('geopoint');

function getPetShops(req, res){
	PetShop.find({}, function(err, petshop) {
        if (!err){ 
            return res.status(200).json({ success: true, 
                message: { 
                    message: 'Success', 
                    pets: petshop
                }
            });
        } 
        
        return res.status(500).json({ success: false, 
            message: { 
                errors: 'Internal Server Error', 
                name: 'InternalServerError'
            }
        });
    });
}

function getPetShop(req, res){
	PetShop.findById(req.params.id, function(err, petshop){
		if(err){
			return res.status(400).json({ success: false, 
				message: err
			});
		}

		if(!petshop){
			return res.status(400).json({ success: false, 
				message: { 
					errors: 'Pet not found', 
					message: 'Pet validation failed', 
					name: 'ValidationError'
				}
			});
		} else {
			return res.status(200).json({ success: true,
				message: petshop
			});
		}
	});
}

function addPetShop(req, res){
	var petshop = new PetShop({
		name: req.body.name,
		password: req.body.latitude,
		longitude: req.body.longitude,
		city: req.body.city,
		state: req.body.state,
		country: req.body.country,
		address: req.body.address,
		open: req.body.open,
		close: req.body.close,
		contact: req.body.contact
	});

	petshop.save(function(err, data){
		if(err){
			return res.status(400).json({success: false, 
				message: err
			});
		}

		res.json({success: true, 
			message: 'Registration successful'
		});
	});
}

function updatePetShop(req, res){	
	PetShop.findOneAndUpdate({ _id: req.body.id }, req.body, function(err, petshop){
		if(err){
			return res.status(400).json({ success: false, 
				message: err
			});
		}  else {
			return res.status(200).json({ success: true,
				message: 'Update successful'
			});
		}
	});
}

function deletePetShop(req, res){
	PetShop.findByIdAndRemove(req.params.id, function(err, petshop){
		if(err){
			return res.status(400).json({ success: false, 
				message: err
			});
		}  else {
			return res.status(200).json({ success: true,
				message: 'Delete successful'
			});
		}
	});
}

function getPetShopByCity(req, res){
	PetShop.find({ city: req.params.city }, function(err, petshop){
		if(err){
			return res.status(400).json({ success: false, 
				message: err
			});
		}

		if(!petshop){
			return res.status(400).json({ success: false, 
				message: { 
					errors: 'Pet not found', 
					message: 'Pet validation failed', 
					name: 'ValidationError'
				}
			});
		} else {
			return res.status(200).json({ success: true,
				message: 'Success',
				petshops: petshop
			});
		}
	});
}

function getPetShopByGeo(req, res){
	// TODO
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