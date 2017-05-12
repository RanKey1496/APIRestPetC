var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var beautifyUnique = require('mongoose-beautiful-unique-validation');

var PetShopSchema = new Schema({
    name:{
        type: String, unique: false, lowercase: true, required: true
    },
    latitude: {
        type: Number, unique: false, required: true
    },
    longitude: {
        type: Number, unique: false, required: true
    }
});

PetShopSchema.plugin(beautifyUnique);
module.exports = mongoose.model('PetShop', PetShopSchema);