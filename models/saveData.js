const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// user and curr scene are set when first iri is recieved
const SaveDataSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, 
    currentScene: {type: Number, required: true}, 
    score: {type: Number}, 
    badges: {type: String},
    finishedGame: {type: Number},
    maxScore: {type:Number}

});


module.exports = mongoose.model('SaveData', SaveDataSchema);