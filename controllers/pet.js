var Pet = require('../models/pet');
var User = require('../models/user');
var GeoPoint = require('geopoint');

function getPets(req, res){
    Pet.find({}, function(err, pets){
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
                errors: { 
                    error: 'DataGetError', 
                    msg: 'Error getting data'
                }
            });  
        }

        return res.status(200).json({ 
			success: true, 
            message: { 
                pet: pet
            }
        });
    })
}

function addPet(req, res){	
    var pet = new Pet(req.body);
    pet.save(function(err, data){
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
				pet: data.name,
                created: true
            }
        });
    });
}

function updatePet(req, res){
    Pet.findByIdAndUpdate(req.body.id, req.body, {new: true}, function(err, pet){
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
				pet: pet,
                updated: true     
            }
        });

    })   
}

function deletePet(req, res){
    Pet.findByIdAndRemove(req.params.id, function(err, pet){
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

module.exports = {
    getPets,
    getPet,
    addPet,
    updatePet,
    deletePet
}