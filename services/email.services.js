const nodemailer = require('nodemailer');
const os = require("os");

const hostname = os.hostname();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASS,
    }
});

const sendMail = async (
    email,
{
    subject,
    html,
}) => {
    try {
        const response = await transport.sendMail({
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject,
            html,
        });
        return response;
    } catch (e) {
        return e;
    }
}

const sendVerifyEmail = async (email, token) => {
    const html = `
          <a href="${hostname}/auth/verify/${token}">Confirm your account</a>
    `;
    const response = await sendMail(email, {
        subject: 'Verify your account',
        html,
    })
    return response;
}

module.exports = {
    sendMail,
    sendVerifyEmail,
}
