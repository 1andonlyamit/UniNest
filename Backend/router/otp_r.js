const express = require('express');
const router = express.Router();
const otpController = require('../controller/otp_c');

router.post('/send', (req, res) => otpController.sendOtp(req, res));
router.post('/verify', (req, res) => otpController.verifyOtp(req, res));

module.exports = router;


