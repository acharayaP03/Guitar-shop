const nodemailer = require('nodemailer');

const Mailgen = require('mailgen');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const registerEmail = async (userEmail, user ) =>{
    try{
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Guitar Shop",
                link: process.env.EMAIL_MAIL_URL
            }
        });

        // create an email content

        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome to Guitar shop!, We are very excited to have you on board.',
                action:{
                    instructions: 'To get validate you account, please click here.',
                    button:{
                        color: '#1a73e8',
                        text: 'validate you account',
                        link: `${process.env.SITE_DOMAIN}varification?t=${emailToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }
        let emailBody = mailGenerator.generate(email);
        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Welcome to Guitar shop',
            html: emailBody
        }

        await transporter.sendMail(message);

        return true;
    }catch (error){
        throw error
    }
}

module.exports = {registerEmail}