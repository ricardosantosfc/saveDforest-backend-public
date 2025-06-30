const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//express stores id as a string, so have to explicitly declare it in the schema as a string, otherwise it assumes its an objectid

const SessionSchema = new Schema({ 
    _id: {
        type: String,
        required: true
    },
    expires: { type: Date, required: true },
    session: {
        cookie: {type:Object},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        isAuthenticated: {type: Boolean}
    }  
    
});

module.exports = mongoose.model('Session', SessionSchema);