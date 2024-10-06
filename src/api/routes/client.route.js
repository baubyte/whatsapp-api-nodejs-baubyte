const express = require('express')
const controller = require('../controllers/client.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')

const router = express.Router()
router.route('/create').post(controller.create)

module.exports = router
