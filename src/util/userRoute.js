const express = require('express');
const User = require('../model/user');
const router = new express.Router();
const sendMail = require('./emailService');


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


router.post('/api/v1/user', createUser);
router.get('/api/v1/user/account', verifyEmail);

module.exports = router;