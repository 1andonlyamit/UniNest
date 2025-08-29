const otpService = require('../services/otpService');

class OtpController {
    async sendOtp(req, res) {
        try {
            const { email } = req.body || {};
            if (!email) {
                return res.status(400).json({ message: 'email is required' });
            }
            const result = await otpService.sendOtpToEmail(email);
            return res.status(200).json({ message: 'OTP sent', expiresAt: result.expiresAt });
        } catch (error) {
            console.error('Failed to send OTP', error);
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
    }

    verifyOtp(req, res) {
        try {
            const { email, otp } = req.body || {};
            if (!email || !otp) {
                return res.status(400).json({ message: 'email and otp are required' });
            }
            const result = otpService.verifyOtpForEmail(email, otp);
            if (!result.success) {
                const reasonToStatus = {
                    not_found: 404,
                    expired: 410,
                    too_many_attempts: 429,
                    invalid: 401
                };
                return res.status(reasonToStatus[result.reason] || 400).json({ message: result.reason });
            }
            return res.status(200).json({ message: 'verified' });
        } catch (error) {
            console.error('Failed to verify OTP', error);
            return res.status(500).json({ message: 'Failed to verify OTP' });
        }
    }
}

module.exports = new OtpController();


