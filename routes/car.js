const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { getCarList } = require('../controllers/car');

router.get('/carlist', auth, getCarList);

module.exports = router;