const crypto = require('crypto');
const emailService = require('./emailService');

// In-memory store: { email: { otp: string, expiresAt: number, attempts: number } }
// Replace with persistent store (DB/Redis) in production if needed.
const emailToOtpState = new Map();

function generateOtpCode() {
    // 6-digit numeric OTP
    return ('' + (Math.floor(Math.random() * 900000) + 100000));
}

function getExpiryTimestamp(ttlMs) {
    return Date.now() + ttlMs;
}

async function sendOtpToEmail(email, options = {}) {
    const ttlMinutes = options.ttlMinutes || 10;
    const subject = options.subject || 'Your UniNest verification code';
    const otp = generateOtpCode();
    const expiresAt = getExpiryTimestamp(ttlMinutes * 60 * 1000);

    emailToOtpState.set(email, { otp, expiresAt, attempts: 0 });

    const text = `Your verification code is ${otp}. It expires in ${ttlMinutes} minutes.`;
    const html = `<p>Your verification code is <b>${otp}</b>.</p><p>It expires in ${ttlMinutes} minutes.</p>`;

    await emailService.sendMail({ to: email, subject, text, html });
    return { success: true, expiresAt };
}

function verifyOtpForEmail(email, otp) {
    const state = emailToOtpState.get(email);
    if (!state) {
        return { success: false, reason: 'not_found' };
    }
    if (Date.now() > state.expiresAt) {
        emailToOtpState.delete(email);
        return { success: false, reason: 'expired' };
    }
    state.attempts += 1;
    if (state.attempts > 5) {
        emailToOtpState.delete(email);
        return { success: false, reason: 'too_many_attempts' };
    }
    if (String(state.otp) !== String(otp)) {
        return { success: false, reason: 'invalid' };
    }
    // success - consume OTP
    emailToOtpState.delete(email);
    return { success: true };
}

module.exports = {
    sendOtpToEmail,
    verifyOtpForEmail
};


