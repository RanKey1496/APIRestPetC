var Vaccination = require('../models/vaccinations');

function getVaccinations(req, res){    
    Vaccination.find({user: req.params.user_id}, function(err, vaccination){
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
                vaccination: vaccination
            }
        });
    });
}

function addVaccination(req, res){    
    var vaccination = new Vaccination(req.body);
    vaccination.save(function(err, data){
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
				message: 'Success', 
				created: true 
			}
        });
		return res.status(200).json({ success: true, 
            message: {
                created: true
            }
        });
    });
}

function updateVaccination(req, res){
    Vaccination.findByIdAndUpdate(req.body.id, req.body, {new: true}, function(err, vaccination){
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
				vaccination: vaccination,
                updated: true     
            }
        });
    });
}

function deleteVaccination(req, res){
    Vaccination.findByIdAndRemove(req.params.id, function(err, res){
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
	getVaccinations,
    addVaccination,
	updateVaccination,
	deleteVaccination
}