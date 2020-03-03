const express = require('express');
const User = require('../models/user.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/user/login', async (req, res) => {
    let user = await User.findByCredentials(req.body.email, req.body.password)

    if (!user)
        return res.send({ errorMessage: "Неверный логин и/или пароль" });

    let token = await User.generateAuthToken(user);

    res.send({
        user: {
            name: user.name,
            role: user.role,
            token: token,
        }
    });
});

router.post('/user/logout', auth, async(req, res) => {
    req.user.update({ token: null });

    res.status(201).send({ msg: "success" });
});

module.exports = router;
