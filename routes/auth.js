const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');

const { register, login, logout } = require('../controllers/auth')

router.post('/register', register)
router.post('/session/login', login)
router.post('/session/logout', auth, logout)

module.exports = router
