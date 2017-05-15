function validarId(req, res, next) {
	req.checkParams('id', 'Id invalido').notEmpty();
	
	var errors = req.validationErrors();
	if (errors) {
		var response = { errors: [] };
		errors.forEach(function(err) {
			response.errors.push(err.msg);
		});
		res.statusCode = 400;
		return res.json(response);
	}
	
	return next();
 }

 function validarPetData(req, res, next) {
	req.checkBody({'name': { notEmpty: true, isLength: { 
								options: [{ min: 3, max: 10 }], 
								errorMessage: 'Debe contener por lo menos 3 caracteres' }}});
	req.checkBody('race', 'Raza invalida').notEmpty();
	req.checkBody('species', 'Especie invalida').notEmpty();
	req.checkBody('adoption_available', 'Adopcion invalida').isBoolean();
	req.checkBody('birth', 'Fecha invalida').notEmpty().isDate();
	req.checkBody({'retrieval': { optional: true, notEmpty: true }});
	req.checkBody({'owner': { optional: true, notEmpty: true }});
	req.checkBody({'veterinary': { optional: true, notEmpty: true }});
	
	var errors = req.validationErrors();
	if (errors) {
		var response = { errors: [] };
		errors.forEach(function(err) {
			response.errors.push(err.msg);
		});
		res.statusCode = 400;
		return res.json(response);
	}

	return next();
 }

 function validarUpdate(req, res, next){
	req.checkBody({'name': { notEmpty: true, optional: true, isLength: { 
								options: [{ min: 3, max: 10 }], 
								errorMessage: 'Debe contener por lo menos 3 caracteres' }}});
	//req.checkBody('race', 'Raza invalida').notEmpty().optional();
	//req.checkBody('species', 'Especie invalida').notEmpty().optional();
	//req.checkBody('adoption_available', 'Adopcion invalida').isBoolean().optional();
	//req.checkBody('birth', 'Fecha invalida').notEmpty().isDate().optional();
	req.checkBody({'race': { optional: true, notEmpty: true }});
	req.checkBody({'species': { optional: true, notEmpty: true }});
	req.checkBody({'birth': { optional: true, notEmpty: true }});

	var errors = req.validationErrors();
	if (errors) {
		var response = { errors: [] };
		errors.forEach(function(err) {
			response.errors.push(err.msg);
		});
		res.statusCode = 400;
		return res.json(response);
	}
	return next();
 }

 function ifErrors(errors){

 }

 module.exports = {
	validarId,
	validarPetData,
	validarUpdate
 };