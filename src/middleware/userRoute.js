const express = require('express');
const User = require('../model/user');
const router = new express.Router();
const sgMail = require('@sendgrid/mail');
const sendGridAPI = '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';


const createUser = async (req, res) =>{
    const user = new User(req.body);
    try {
        const checkEmail = await User.find({ email: user.email });
        if(checkEmail.length > 0){
            return res.status(400).send({
                'Error': 'This Email id is already used'
            });
        }
        await user.save();
        res.status(201).send(user);
        sendMail(user);
    } catch (e) {
        res.status(400).send(e);
    }
}

const verifyEmail = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await User.findOne({ _id: id });

        if(!user){
            return res.status(400).send({
                Error: 'User is not exist'
            });
        }
        
        if(user.verified){
            return res.status(200).send({
                message: 'User is already registered'
            });
        }
        
        const updatedUser = await User.findByIdAndUpdate(id, {verified: true} , { new: true, runValidators: true})
        res.status(200).send({
            Message: 'Registered Successfully.'
        });

    } catch (e) {
        res.status(400).send({
            e
        });
    }
}

const sendMail = (user) =>{
    const id = user._id.toString();
    const email = user.email;
    const link = 'http://localhost:3000/api/v1/user/account?id=' + id + '&email=' + email;

    sgMail.setApiKey(sendGridAPI);
    sgMail.send({
        to: email,
        from: 'benjamindavid023@gmail.com',
        subject: 'Check',
        text: 'Please click the following link to register your email: ' + link
    });

    console.log('Link sent to this Email ' + email);
    console.log('Link :' +link);
}

router.post('/api/v1/user', createUser);
router.get('/api/v1/user/account', verifyEmail);

module.exports = router;