const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AESSchema = new Schema({
    scene: {type: Number, required: true},
    scoreAES: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    AESquestions: {
        type:Map,
        of: Number
    }}, 
    {timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('AES', AESSchema);