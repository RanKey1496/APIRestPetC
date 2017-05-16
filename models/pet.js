var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var beautifyUnique = require('mongoose-beautiful-unique-validation');

var PetSchema = new Schema({
    name: {
		type: String, unique: false, lowercase: true, required: true
	}, 
    race: {
		type: String, unique: false, lowercase: true, required: true
	}, 
    species: {
        type: String, unique: false, lowercase: true, required: true
    }, 
    adoption_available: {
        type: Boolean, unique: false, required: false, default: false
    },
    birth: {
        type: Date, unique: false, lowercase: true, required: true
    }, 
    retrieval: {
        type: Date, unique: false, lowercase: true, required: false
    }, 
    owner: { 
        type: Schema.ObjectId, ref: 'User', required: false
    },
    veterinary: {
        type: Schema.ObjectId, ref: 'PetShop', required: false
    }
});

PetSchema.plugin(beautifyUnique);
module.exports = mongoose.model('Pet', PetSchema);

