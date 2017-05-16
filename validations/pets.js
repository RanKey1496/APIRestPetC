function validateId(req, res, next) {
	req.checkParams('id', 'Mascota invalida').notEmpty().isValidPet(req.params.id);
	
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

 function validatePetData(req, res, next) {
	req.checkBody('name', 'El nombre debe contener por lo menos 3 caracteres').notEmpty().len(3,15);
	req.checkBody('race', 'Raza invalida').notEmpty();
	req.checkBody('species', 'Especie invalida').notEmpty();
	req.checkBody('adoption_available', 'Adopcion invalida').isBoolean();
	req.checkBody('birth', 'Fecha invalida').notEmpty().isDate();
	req.checkBody('retrieval', 'Retrieval invalida').optional().notEmpty();
	req.check('owner', 'Usuario invalido').optional().notEmpty().isValidUser(req.body.owner);
	req.check('veterinary', 'Veterinaria invalida').optional().notEmpty().isValidPetShop(req.body.veterinary);
	
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
	req.checkBody('name', 'Nombre invalido').optional().notEmpty().len(3,15);
	req.checkBody('race', 'Raza invalida').optional().notEmpty();
	req.checkBody('species', 'Especie invalida').optional().notEmpty();
	req.checkBody('birth', 'Nacimiento invalido').optional().notEmpty().isDate();
	req.checkBody('adoption_available', 'Estado de adopcion invalida').optional().notEmpty().isBoolean();
	req.checkBody('retrieval', 'Retrieval invalida').optional().notEmpty();
	req.check('owner', 'Usuario invalido').optional().notEmpty().isValidUser(req.body.owner);
	req.check('veterinary', 'Veterinaria invalida').optional().notEmpty().isValidPetShop(req.body.veterinary);

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
	validatePetData,
	validateUpdate
 };