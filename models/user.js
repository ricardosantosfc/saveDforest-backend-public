var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//
var UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    age: {type: String, required:true},
    sex: {type: String, required:true},
    nationality: {type: String, required:true},
    education_level: {type: String, required:true},
    education_background: {type: String},
    education_background_specified: {type: String},


});


module.exports = mongoose.model('User', UserSchema);