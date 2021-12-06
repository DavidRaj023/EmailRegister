const express = require('express');
const User = require('../model/user');
const router = new express.Router();

const createUser = async (req, res) =>{
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(emp);
    } catch (e) {
        res.status(400).send(e);
    }
}

//Routers
router.post('/api/v1/user', createUser);

module.exports = router;