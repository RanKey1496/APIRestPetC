var Vaccination = require('../models/vaccinations');

function addVaccination(req, res){
    if(!req.body.type || !req.body.date || !req.body.pet_id){
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
        diagnostic: req.body.diagnostic       
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