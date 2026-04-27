const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' 
    }
});

module.exports = mongoose.model('TokenBlacklist', blacklistSchema);