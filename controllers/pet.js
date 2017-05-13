var Pet = require('../models/pet');
var GeoPoint = require('geopoint');

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
    if(!req.body.name || !req.body.race 
            || !req.body.species || !req.body.adoption_available
            || !req.body.birth){
                
        return res.status(400).json({ 
            success: false, 
            message: { 
                errors: 'Bad Request Error, data missing', 
                name: 'BadRequestError'
            }
        });        
    }
    var pet = new Pet({
        name: req.body.name,
        race: req.body.race,
        species: req.body.species,
        adoption_available: req.body.adoption_available,
        birth: req.body.birth
    })
    pet.save(function(err, data){
        if(err){
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
    Pet.findByIdAndUpdate(req.params.id, req.body, function(err, pet){
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