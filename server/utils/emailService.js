const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
    },
});

exports.sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: config.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};
