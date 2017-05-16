var Pet = require('../models/pet');
var PetShop = require('../models/pet_shop');
var GeoPoint = require('geopoint');

function getAvailablePets(req, res){
    Pet.find({'adoption_available': 'true'}, function(err, pets) {
        if (err){ 
            return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'DataGetError', 
                    msg: 'Error getting data'
                }
            });
        } 

		return res.status(200).json({ 
			success: true, 
            message: { 
                pets: pets
            }
        });
    });
}

function getPetsByLocation(req, res){ 
    var filteredPets = [];
    Pet.find({adoption_available: true}, function(err, pets) {
        if (!err){ 
            for (var i = 0; i < pets.length; i++) {
                var pet = pets[i];
                if(pet.veterinary != null){
                    PetShop.findOne({_id:pet.veterinary.id}, function(err, petShop){
                        if(!err){
                            var shopGeoPoint = new GeoPoint(petShop.latitude, petShop.longitude);                        
                            var petGeoPoint = new GeoPoint(latitude, longitude);
                            if(shopGeoPoint.distanceTo(petGeoPoint, true) <= 20){
                                filteredPets.push(pet);
                            }    
                        } else {
                            return res.status(500).json({ 
								success: false, 
								errors: { 
									error: 'SearchError', 
									msg: 'Error searching veterinary by location'
								}
							});
                        }
                    });
                } 
            }
			if(!filteredPets){
				return res.status(200).json({ 
					success: true, 
					errors: { 
						error: 'NotPetsFound', 
						msg: 'No results found'
					}
				});
			} else {
				return res.status(200).json({ 
					success: true, 
					message: { 
						pets: filteredPets
					}
				});
			}
        } 
        
        return res.status(500).json({ 
			success: false, 
            errors: { 
				error: 'PetSearchError', 
                msg: 'Error searching pet availables'
            }
        });
    });
    
}

module.exports = {
    getAvailablePets,
    getPetsByLocation
}