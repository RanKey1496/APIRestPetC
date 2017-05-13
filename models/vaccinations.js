var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var beautifyUnique = require('mongoose-beautiful-unique-validation');

var VaccinationSchema = new Schema({
    type: {
		type: String, unique: false, lowercase: true, required: true
	},
    diagnostic: {
		type: String, unique: false, lowercase: true, required: false
	},
    date: {
		type: Date, unique: false, lowercase: true, required: true
	},
    pet: {
		type: Schema.Types.ObjectId, ref: 'pet', required: false
	}
});

VaccinationSchema.plugin(beautifyUnique);
module.exports = mongoose.model('Vaccination', VaccinationSchema);