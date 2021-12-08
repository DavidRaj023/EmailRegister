require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const sendGridAPI = process.env.SEND_GRID;

const sendMail = (user) =>{
    try {
        const id = user._id.toString();
        const userName = user.name;
        const email = user.email;
        const link = 'http://localhost:3000/api/v1/user/account?id=' + id + '&email=' + email;
        
        sgMail.setApiKey(sendGridAPI);
        sgMail.send({
            to: email,
            from: 'benjamindavid023@gmail.com',
            subject: 'Mail From User Register Application',
            text: 'Hi ' + userName + ',  Please click the following link to register your email: ' + link
        });

        console.log('Link sent to this Email ' + email);
        console.log('Link :' +link);

    } catch (error) {
        console.log(error);
    }
}

module.exports =sendMail;