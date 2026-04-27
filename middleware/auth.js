const jwt = require('jsonwebtoken');
const { failedResponse } = require('../utils/response');
const TokenBlacklist = require('../models/TokenBlacklist');


const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return failedResponse(res);
        }

        const token = authHeader.split(' ')[1];

        const isBlacklisted = await TokenBlacklist.findOne({ token });

        if (isBlacklisted) {
            return failedResponse(res);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return failedResponse(res);
    }
};

module.exports = auth;