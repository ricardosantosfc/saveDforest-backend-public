const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IRISchema = new Schema({
    scene: {type: Number, required: true},
    scoreIRI: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    IRIquestions: {
        type:Map,
        of: Number
    }}, 
    {timestamps: { createdAt: true, updatedAt: false }
});


module.exports = mongoose.model('IRI', IRISchema);