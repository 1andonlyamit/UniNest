const nodemailer = require('nodemailer');
const config = require('../config/master-config');

let cachedTransporter = null;

function createTransporter() {
    const mailConfig = config.mail || {};
    const { host, port, secure, auth, from } = mailConfig;
    if (!host || !port || !auth || !auth.user || !auth.pass) {
        throw new Error('SMTP configuration is missing. Please set mail.{host,port,secure,auth{user,pass},from} in config.');
    }
    return nodemailer.createTransport({
        host,
        port,
        secure: Boolean(secure),
        auth: {
            user: auth.user,
            pass: auth.pass
        }
    });
}

function getTransporter() {
    if (!cachedTransporter) {
        cachedTransporter = createTransporter();
    }
    return cachedTransporter;
}

async function sendMail({ to, subject, text, html }) {
    const transporter = getTransporter();
    const from = (config.mail && config.mail.from) || undefined;
    return transporter.sendMail({ from, to, subject, text, html });
}

module.exports = {
    sendMail
};

