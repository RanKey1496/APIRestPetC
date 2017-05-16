function validateId(req, res, next) {
	req.checkParams('id', 'Vacunacion invalida').notEmpty().isValidVaccionation(req.params.id);
	
	req.asyncValidationErrors().then(function() {
        next();
    }).catch(function(errors) {
        if(errors) {
            return res.status(400).json({
                success:false,
                errors: errors
            });
        };
    });
 }

 function validateVaccionationData(req, res, next) {
	req.checkBody('type', 'Tipo de vacunacion invalido').notEmpty().len(3);
	req.checkBody('diagnostic', 'Diagnostico invalido').optional().notEmpty();
	req.checkBody('date', 'Fecha invalida').notEmpty().isDate();
	req.check('pet', 'Mascota invalida').notEmpty().isValidPet(req.body.pet);
	req.check('owner', 'Usuario invalido').notEmpty().isValidUser(req.body.owner);
	
	req.asyncValidationErrors().then(function() {
        next();
    }).catch(function(errors) {
        if(errors) {
            return res.status(400).json({
                success:false,
                errors: errors
            });
        };
    });
 }

 function validateUpdate(req, res, next){
	req.checkBody('type', 'Tipo de vacunacion invalido').optional().notEmpty().len(3);
	req.checkBody('diagnostic', 'Diagnostico invalido').optional().notEmpty();
	req.checkBody('date', 'Fecha invalida').optional().notEmpty().isDate();
	req.check('pet', 'Mascota invalida').optional().notEmpty().isValidPet(req.body.pet);
	req.check('owner', 'Usuario invalido').optional().notEmpty().isValidUser(req.body.owner);

	req.asyncValidationErrors().then(function() {
        next();
    }).catch(function(errors) {
        if(errors) {
            return res.status(400).json({
                success:false,
                errors: errors
            });
        };
    });
 }

 module.exports = {
	validateId,
	validateVaccionationData,
	validateUpdate
 };