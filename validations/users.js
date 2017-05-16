 function validateUserData(req, res, next) {
	req.checkBody('email', 'Email invalido').notEmpty().isEmail();
	req.checkBody('password', 'La contraseña debe contener por lo menos 6 caracteres').notEmpty().len(6);
	req.checkBody('firstname', 'Nombres invalidos').notEmpty();
	req.checkBody('lastname', 'Apellidos invalidos').notEmpty();
	req.checkBody('city', 'Ciudad invalida').notEmpty();
	req.checkBody('state', 'Departamento invalido').notEmpty();
	req.checkBody('country', 'Pais invalido').notEmpty();
	req.checkBody('address', 'Direccion invalida').notEmpty();
	req.checkBody('phone', 'Telefono de contacto invalido').notEmpty();
	req.checkBody('picture', 'Imagen invalida').optional().notEmpty();
	req.checkBody('pet', 'Mascota invalida').optional().notEmpty().isValidPet(req.body.pet);
	
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

 function validateLogin(req, res, next){
	req.checkBody('email', 'Email invalido').notEmpty().isEmail();
	req.checkBody('password', 'La contraseña debe contener por lo menos 6 caracteres').notEmpty().len(6);

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

 function validateToken(req, res, next){
 	 req.checkQuery('token', 'Token undefined').notEmpty();

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
	validateUserData,
	validateLogin,
	validateToken
 };