const User = require('../models/User');
const { failedResponse } = require('../utils/response');

const getMyProfile = async (req, res) => {
    try {
        const { timestamp } = req.query;

        if (!timestamp) {
            return failedResponse(res);
        }

        const user = await User.findById(req.user.userid);

        if (!user) {
            return failedResponse(res);
        }

        return res.status(200).json({
            username: user.username,
            displayusername: user.displayusername,
            userid: user._id
        });

    } catch (error) {
        return failedResponse(res);
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const { displayusername, timestamp } = req.body || {};
        if (!displayusername || !timestamp) {
            return failedResponse(res);
        }
        const user = await User.findById(req.user.userid);
        if (!user) {
            return failedResponse(res);
        }
        user.displayusername = displayusername;
        await user.save();
        return res.status(200).json({});
    } catch (error) {
        return failedResponse(res);
    }
};

module.exports = { getMyProfile, updateMyProfile };