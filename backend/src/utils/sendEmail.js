const nodemailer = require('nodemailer');

const sendLoginEmail = async (userEmail, userName) => {
    console.log("Attempting to send email to:", userEmail); // ഇത് ചേർക്കുക
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // App Password
            }
        });

        const mailOptions = {
            from: `"Badminton Pro" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Login Successful!',
            html: `<h3>Hello ${userName},</h3><p>You have successfully logged into your account.</p>`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email error:', error);
    }
};

module.exports = sendLoginEmail;