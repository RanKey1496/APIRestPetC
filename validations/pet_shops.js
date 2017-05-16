function validateId(req, res, next) {
	req.checkParams('id', 'Veterinaria invalida').notEmpty().isValidPetShop(req.params.id);
	
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

 function validatePetShopData(req, res, next) {
	req.checkBody('name', 'El nombre debe contener por lo menos 3 caracteres').notEmpty().len(3);
	req.checkBody('latitude', 'Latitud invalida').notEmpty();
	req.checkBody('longitude', 'Longitud invalida').notEmpty();
	req.checkBody('city', 'Ciudad invalida').notEmpty();
	req.checkBody('state', 'Departamento invalido').notEmpty();
	req.checkBody('country', 'Pais invalido').notEmpty();
	req.checkBody('address', 'Direccion invalida').notEmpty();
	req.checkBody('contact', 'Telefono de contacto invalido').notEmpty();
	req.checkBody('open', 'Hora de apertura invalida').optional().notEmpty();
	req.checkBody('close', 'Hora de cierre invalida').optional().notEmpty();
	
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
	req.checkBody('name', 'El nombre debe contener por lo menos 3 caracteres').optional().notEmpty().len(3);
	req.checkBody('latitude', 'Latitud invalida').optional().notEmpty();
	req.checkBody('longitude', 'Longitud invalida').optional().notEmpty();
	req.checkBody('city', 'Ciudad invalida').optional().notEmpty();
	req.checkBody('state', 'Departamento invalido').optional().notEmpty();
	req.checkBody('country', 'Pais invalido').optional().notEmpty();
	req.checkBody('address', 'Direccion invalida').optional().notEmpty();
	req.checkBody('contact', 'Telefono de contacto invalido').notEmpty();
	req.checkBody('open', 'Hora de apertura invalida').optional().notEmpty();
	req.checkBody('close', 'Hora de cierre invalida').optional().notEmpty();

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

 function validateCity(req, res, next){
 	 req.checkParams('city', 'Ciudad invalida').notEmpty();

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

 function validateGeo(req, res, next){
	 req.checkParams('latitude', 'Latitud invalida').notEmpty();
	 req.checkParams('longitude', 'Longitud invalida').notEmpty();

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
	validatePetShopData,
	validateUpdate,
	validateCity,
	validateGeo
 };