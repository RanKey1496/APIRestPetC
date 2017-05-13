var Vaccination = require('../models/vaccinations');

function getVaccinations(req, res){
    if(!req.params.user_id){
        return res.status(400).json({ 
            success: false, 
			message: { 
				errors: 'Bad Request Error, data missing', 
				name: 'BadRequestError'
    		}
		}); 
    }    
    
    Vaccination.find({user: req.params.user_id}, function(err, vaccination){
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

        return res.status(200).json({ 
            success: true, 
            message: { 
                message: 'Success',
                data: vaccination
            }
        }); 
    });
}

function addVaccination(req, res){
    if(!req.body.type || !req.body.date 
                || !req.body.pet_id, !req.body.user_id){
        return res.status(400).json({ 
            success: false, 
			message: { 
				errors: 'Bad Request Error, data missing', 
				name: 'BadRequestError'
    		}
		}); 
    }
    
    var vaccination = new Vaccination({
        pet: req.body.pet_id,
        type: req.body.type,
        date: req.body.date,
        diagnostic: req.body.diagnostic,
        user: req.body.user_id    
    });
    vaccination.save(function(err, data){
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

function updateVaccination(req, res){
    Vaccination.findOneAndUpdate({_id:req.body.id}, req.body, function(err, vaccination){
        if(err){
            return res.status(400).json({ success: false, 
				message: err
			});
        }

        return res.status(200).json({ success: true,
			message: 'Update successful',
            vaccination: vaccination
		});
    });
}

function deleteVaccination(req, res){
    Vaccination.findByIdAndRemove(req.body.id, function(err, res){
        if(err){
			return res.status(400).json({ success: false, 
				message: err
			});
		} 

        return res.status(200).json({ success: true,
			message: 'Delete successful'
		});	
    });
}

module.exports = {
	getVaccinations,
    addVaccination,
	updateVaccination,
	deleteVaccination
}