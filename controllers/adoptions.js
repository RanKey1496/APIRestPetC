var Pet = require('../models/pet');
var PetShop = require('../models/pet_shop');
var GeoPoint = require('geopoint');

function getAvailablePets(req, res){
    Pet.find({'adoption_available': 'true'}, function(err, pets) {
        if (!err){ 
            return res.status(200).json({ success: true, 
				message: { 
					message: 'Success', 
					pets: pets
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

function getPetsByLocation(req, res){
    if(!req.body.latitude || !req.body.longitude){
        return res.status(400).json({success: false, 
			message: { 
				errors: 'Bad request', 
				message: 'Expected params not found', 
				name: 'ArgsNotFoundError'
			}
		});
    }   
    var filteredPets = [];
    Pet.find({'adoption_available': 'true'}, function(err, pets) {
        if (!err){ 
            for (var i = 0; i < pets.length; i++) {
                var pet = pets[i];
                if(pet.veterinary != null){
                    PetShop.findOne({'_id':pet.veterinary.id}, function(err, petShop){
                        if(!err){
                            var shopGeoPoint = new GeoPoint(petShop.latitude, petShop.longitude);                        
                            var petGeoPoint = new GeoPoint(latitude, longitude);
                            if(shopGeoPoint.distanceTo(petGeoPoint, true) <= 20){
                                filteredPets.push(pet);
                            }    
                        } else {
                            return res.status(500).json({ success: false, 
                                message: { 
                                    errors: 'Internal Server Error', 
                                    name: 'InternalServerError'
                                }
                            });
                        }
                    });
                } 
            }
            return res.status(200).json({success: false, 
                message: { 
                    message: 'success', 
                    pets: filteredPets
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

module.exports = {
    getAvailablePets,
    getPetsByLocation
}