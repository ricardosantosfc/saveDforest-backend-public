const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SAMSchema = new Schema({
    scene: {type: Number, required: true},
    arousal: {type: Number, required: true},
    valence: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }}, 
    {timestamps: { createdAt: true, updatedAt: false }
});


module.exports = mongoose.model('SAM', SAMSchema);