require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const sendGridAPI = process.env.SEND_GRID;


//SMTP
const sendMail = async(user) =>{
    try {
        const id = user._id.toString();
        const userName = user.name;
        const email = user.email;
        const link = 'http://localhost:3000/api/v1/user/account?id=' + id;
        
        sgMail.setApiKey(sendGridAPI);
        sgMail.send({
            to: email,
            from: 'benjamindavid023@gmail.com',
            subject: 'Mail From User Register Application',
            html: '<h3>Hi ' + userName + ', </h3>' + '<p>Please click the following link to register your email: ' + link +' </p>'
        });

        console.log('Link sent to this Email ' + email);
        console.log('Link :' +link);

    } catch (error) {
        console.log(error);
    }
}

module.exports =sendMail;