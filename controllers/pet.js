var Pet = require('../models/pet');
var User = require('../models/user');
var GeoPoint = require('geopoint');

//TODO: Hacer excepciones generales como el error 500 y el 200
//Creo que solo creando un objeto en el transversal sería suficiente

function getPets(req, res){
    Pet.find({}, function(err, pets){
        if(err){
            return res.status(500).json({ 
                success: false, 
                message: { 
                    errors: 'Error getting data', 
                    name: 'DataGetError',
                    created: false
                }
            });  
        }

        return res.status(200).json({ success: true, 
            message: { 
                message: 'Success', 
                pets: pets
            }
        });
    })
}

function getPet(req, res){
    Pet.findById(req.params.id, function(err, pet){
        if(err){
            return res.status(500).json({ 
                success: false, 
                message: { 
                    errors: 'Error getting data', 
                    name: 'DataGetError',
                    created: false
                }
            });  
        }

        return res.status(200).json({ success: true, 
            message: { 
                message: 'Success', 
                pet: pet
            }
        });
    })
}

function addPet(req, res){
	//TODO:
	//Arreglar que se pueda meter el owner, hay que hacer una consulta y no se le puede pasar solo el Id, 
	//si no un objeto
	
    var pet = new Pet({
        name: req.body.name,
        race: req.body.race,
        species: req.body.species,
        adoption_available: req.body.adoption_available,
        birth: req.body.birth
    })
    pet.save(function(err, data){
        if(err){
			console.log(err);
            return res.status(500).json({ 
                success: false, 
                message: { 
                    errors: 'Error inserting data', 
                    name: 'DataInsertError',
                    created: false
                }
            });    
        }

        return res.status(200).json({ success: true, 
            message: { 
                message: 'Success', 
                created: true 
            }
        });
    });
}

function updatePet(req, res){
    Pet.findByIdAndUpdate(req.body.id, req.body, function(err, pet){
        if(err){
            return res.status(500).json({ 
                success: false, 
                message: { 
                    errors: 'Error updating data', 
                    name: 'DataUpdateError',
                    updated: false
                }
            }); 
        }

        return res.status(200).json({ success: true, 
            message: { 
                message: 'Success', 
                updated: true,
                pet: pet 
            }
        });

    })   
}

function deletePet(req, res){
    Pet.findByIdAndRemove(req.params.id, function(err, pet){
        if(err){
            return res.status(500).json({ 
                success: false, 
                message: { 
                    errors: 'Error deleting data', 
                    name: 'DataDeletionError',
                    deleted: false
                }
            }); 
        }

        return res.status(200).json({ success: true, 
            message: { 
                message: 'Success', 
                deleted: true
            }
        });
    });   
}

module.exports = {
    getPets,
    getPet,
    addPet,
    updatePet,
    deletePet
}