const nodemailer = require('nodemailer');
const ExpressError = require('../utils/ExpressError');

module.exports.index = async (req, res, next) => {
    res.render('contact/index');
};

module.exports.sendEmail = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_GMAIL,
             pass: process.env.USER_PASS,
        
        },
        secure: true,
        tls: {
            rejectUnauthorized: false
        }
    });

    const { username, email, message } = req.body;

    try {
        const mailOptions = {
            from: email,
            to: 'fedyukova.developer@gmail.com',
            subject: `Nuevo mensaje de ${username} (${email})`,
            text: message
        };

        await transporter.sendMail(mailOptions);

        req.flash('success', 'Email sent successfully.');
       res.redirect('/contact'); 
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error sending the email.');
        res.status(500).json({ success: false, error: 'Oooops Error sending the email. Please try again later or contact me via WhatsApp or avseniya22@gmail.com' });
    }
};
