var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

var beautifyUnique = require('mongoose-beautiful-unique-validation');

var UserSchema = Schema({
	email: {
		type: String, unique: true, lowercase: true, required: true
	},
	password: {
		type: String, select: false, required: true
	},
	firstname: {
		type: String, required: true, trim: true
	},
	lastname: {
		type: String, required: true, trim: true
	},
	city: {
		type: String, unique: false, required: true
	},
	state: {
		type: String, unique: false, required: true
	},
	country: {
		type: String, unique: false, required: true
	},
	address: {
		type: String, unique: false, required: true
	},
	phone: {
		type: String, required: false
	},
	picture: String,
	signupDate: {
		type: Date, default: Date.now()
	},
	role: {
		type: String, default: 'user'
	}
});

UserSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')){
		return next();
	};
	bcrypt.genSalt(10, function(err, salt){
		if(err){
			return next();
		}
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.plugin(beautifyUnique);
module.exports = mongoose.model('User', UserSchema);