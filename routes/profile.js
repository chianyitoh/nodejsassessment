const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { getMyProfile, updateMyProfile } = require('../controllers/profile');

router.get('/getmyprofile', auth, getMyProfile);
router.post('/updatemyprofile', auth, updateMyProfile);

module.exports = router;