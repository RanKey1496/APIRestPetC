var Pet = require('../models/pet');
var PetShop = require('../models/pet_shop');
var GeoPoint = require('geopoint');

function getPets(req, res){

}

function getPet(req, res){
    
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
    
}

function deletePet(req, res){
    
}

module.exports = {
    getPets,
    getPet,
    addPet,
    updatePet,
    deletePet
}