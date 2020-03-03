const express = require('express');
const Train = require('../models/train.js');
const auth = require('../middleware/auth');

const router = express.Router();

var types = ["электровоз", "тепловоз", "электротепловоз"];
var colors = ["red", "green", "blue"];

router.post('/trains', auth, async (req, res) => {
    /*for (let i = 0; i < 10; i++) {
        Train.create({
            type: types[Math.floor(0 + Math.random() * (2 + 1 - 0))],
            color: colors[Math.floor(0 + Math.random() * (2 + 1 - 0))],
        });
        console.log(i);
    }*/
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let limit = 20;

    Train.findAndCountAll({
        limit: limit,
        offset: req.body.offset,

    }).then((result) => {
        res.send({
            list: result.rows,
            count: result.count,
        })
    })
});

/*router.post('/user/logout', auth, async(req, res) => {
    req.user.update({ token: null });

    res.status(201).send({ msg: "success" });
});*/

module.exports = router;
