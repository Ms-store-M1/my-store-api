/* Controller NODEMAILER */ 

const nodemailer = require('nodemailer');

// Fonction pour envoyer un e-mail
async function sendEmail(receiverEmail, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mystore.noreply2@gmail.com',
                pass: 'hwteeyyslmiqbceu'
            }
        });

        const mailOptions = {
            from: 'mystore.noreply2@gmail.com',
            to: receiverEmail,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé :', info.response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
}

module.exports = {
    sendEmail
};