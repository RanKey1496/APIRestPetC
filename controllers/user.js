var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config');
var bcrypt = require('bcrypt-nodejs');

function signup(req, res){
	var user = new User(req.body);

	user.save(function(err, data){
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
				user: data.email,
                created: true
            }
        });
	});
};

function signin(req, res){
	User.findOne({ email: req.body.email.toLowerCase() }, 'password role firstname lastname email', function(err, user){
		if(err){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'SearchError', 
                    msg: 'Error searching data'
                }
            });
		}

		if(!user){
			return res.status(500).json({ 
                success: false, 
                errors: { 
                    error: 'UserNotFound', 
                    msg: 'User doesnt exist'
                }
            });
		} else if (user){
			bcrypt.compare(req.body.password, user.password, function(errB, resB){
				if(errB){
					return res.status(500).json({ 
						success: false, 
						errors: { 
							error: 'PasswordError', 
							msg: errB
						}
					});
				}

				if(!resB){
					return res.status(500).json({ 
						success: false, 
						errors: { 
							error: 'ValidationError', 
							msg: 'Invalid email or password'
						}
					});
				} else {
					var token = jwt.sign({
						email: user.email,
						firstname: user.firstname,
						lastname: user.lastname,
						role: user.role
					}, config.hash_secret, {
						expiresIn: '10m'
					});
					return res.status(200).json({ 
						success: true, 
						message: { 
							token: token
						}
					});
				}
			});
		}
	});
};

function tokenCheck(req, res, next){
	jwt.verify(req.query.token, config.hash_secret, function(err, decoded) {      
      	if (err) {
			return res.status(500).json({ 
				success: false, 
				errors: { 
					error: err.name, 
					msg: err.message
				}
			});
      	} else {
        	req.decoded = decoded;    
        	next();
      	}
	});
};

function getAuthenticatedUser(req, res){
	return res.json({success: true,
		message: {
			authenticated: req.decoded
		}
	});
};

function uploadPicture(req, res){
	if(!req.file){
		return res.status(404).json({success: false, 
			message: {
				errors: 'No files were uploaded',
				message: 'No images were uploaded',
				name: 'ValidationError'
			}
		});
	}

	var file = 'http://localhost:3000/pictures/'.concat(req.file.filename);
	User.findOneAndUpdate({ email: req.decoded.email }, {picture: file}, function(err, data){
		if(err){
			return res.status(500).json({success: false, 
				message: err
			});
		}

		return res.json({success: true, 
			message: 'Picture update'});
	});
};

module.exports = {
	tokenCheck,
	signup,
	signin,
	getAuthenticatedUser,
	uploadPicture
}