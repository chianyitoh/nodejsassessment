const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    },
    displayusername: {
        type: String,
        required: true,
        maxlength: 500
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);