const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//currently expiring in 24h
const ResetPwdTokenSchema = new Schema({
    token: { type: String,required: true},
    createdAt: { type: Date, default: Date.now, expires: 86400},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
});


module.exports = mongoose.model('ResetPwdToken', ResetPwdTokenSchema);