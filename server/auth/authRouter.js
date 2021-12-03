const express = require('express');
const router = express.Router();
const authController = require('./authController')

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/isLogin', authController.isLogin)

module.exports = router
