var PetShop = require('../models/pet_shop');
var GeoPoint = require('geopoint');

function getPetShops(req, res){
	PetShop.find({}, function(err, petshop) {
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
                petshops: petshop
            }
        });
    });
}

function getPetShop(req, res){
	PetShop.findById(req.params.id, function(err, petshop){
		if(err){
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
                petshop: petshop
            }
        });
	});
}

function addPetShop(req, res){
	var petshop = new PetShop(req.body);

	petshop.save(function(err, data){
		if(err){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'DataInsertError', 
                    msg: 'Error inserting data',
                    created: false
                }
            });
		}

		return res.status(200).json({ success: true, 
            message: { 
				petshop: data,
                created: true
            }
        });
	});
}

function updatePetShop(req, res){	
	PetShop.findByIdAndUpdate(req.body.id, req.body, {new: true}, function(err, petshop){
		if(err){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'DataUpdateError', 
                    msg: 'Error updating data',
                    updated: false
                }
            }); 
		}

		return res.status(200).json({ 
			success: true, 
            message: {
				petshop: petshop,
                updated: true     
            }
        });
	});
}

function deletePetShop(req, res){
	PetShop.findByIdAndRemove(req.params.id, function(err, petshop){
		if(err){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'DataDeleteError', 
                    msg: 'Error deleting data',
                    deleted: false
                }
            });
		}

		return res.status(200).json({ 
			success: true, 
            message: { 
                deleted: true
            }
        });
	});
}

function getPetShopByCity(req, res){
	PetShop.find({ city: req.params.city }, function(err, petshop){
		if(err){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'CitySearchError', 
                    msg: 'Error searching by city'
                }
            });
		}

		if(!petshop){
			return res.status(200).json({ 
				success: true, 
				errors: { 
					error: 'NotPetShopsFound',
					msg: 'No results found'
				}
			});
		} else {
			return res.status(200).json({ 
				success: true, 
				message: { 
					petshop: petshop
				}
			});
		}
	});
}

function getPetShopByGeo(req, res){
	var location = new GeoPoint(req.params.latitude, req.params.longitude);
	var filteredPetShops = [];
	PetShop.find({}, function(err, petshops){
		if(err){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'GeoSearchError', 
                    msg: 'Error searching by GeoPoint'
                }
            });
		}

		for (var i = 0; i < petshops.length; i++) {
			var petShop = petshops[i];
			var petShopLocation = new GeoPoint(petShop.latitude, petShop.longitude);
			if(location.distanceTo(petShopLocation, true) <= 20){
				filteredPetShops.push(petShop);
			}
		}
	});

	if(!filteredPetShops){
		return res.status(200).json({ 
			success: true, 
            errors: { 
				error: 'NotPetShopsFound', 
                msg: 'No results found'
            }
        });
	} else {
		return res.status(200).json({ 
			success: true, 
			message: { 
				petshops: filteredPetShops
			}
		});
	}
}

module.exports = {
	getPetShop,
    getPetShops,
    addPetShop,
    updatePetShop,
    deletePetShop,
    getPetShopByCity,
    getPetShopByGeo
}