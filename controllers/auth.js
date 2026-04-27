const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { generateToken } = require('../utils/jwt');
const { failedResponse } = require('../utils/response');
const TokenBlacklist = require('../models/TokenBlacklist');

const register = async (req, res) => {
    try {
        const { username, password, displayusername, timestamp } = req.body;
        if (!username || !password || !displayusername || !timestamp) {
            return failedResponse(res);
        }
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return failedResponse(res);
        }

        // Password validation : 6-50 characters
        if (password.length < 6 || password.length > 50) {
            return failedResponse(res);
        }

        // Password hashing - security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            password: hashedPassword,
            displayusername
        });
        // Generate JWT token
        const token = jwt.sign(
            { userid: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        return res.status(200).json({
            token: token,
            displayusername: user.displayusername,
            userid: user._id
        });
    } catch (error) {
        console.log(error);
        return failedResponse(res);
    }
};

const login = async (req, res) => {
    try {
        const { username, password, timestamp } = req.body || {};
        if (!username || !password || !timestamp) {
            return failedResponse(res);
        }
        const user = await User.findOne({ username });
        if (!user) {
            return failedResponse(res);
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return failedResponse(res);
        }

        const token = generateToken(user);

        return res.status(200).json({
            token,
            displayusername: user.displayusername,
            userid: user._id
        });
    } catch (error) {
        console.log(error);
        return failedResponse(res);
    }
};

const logout = async (req, res) => {
    try {
        const { timestamp } = req.body || {};
        const authHeader = req.headers.authorization;

        if (!timestamp || !authHeader || !authHeader.startsWith('Bearer ')) {
            return failedResponse(res);
        }

        const token = authHeader.split(' ')[1];

        // optional: verify token first
        jwt.verify(token, process.env.JWT_SECRET);

        // store in blacklist
        await TokenBlacklist.create({ token });

        return res.status(200).json({});

    } catch (error) {
        console.log(error);
        return failedResponse(res);
    }
};

module.exports = {
    register,
    login,
    logout
};