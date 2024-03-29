const express = require('express');
const models = require('../models/index.js');
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

    let limit = (req.body.limit) ? req.body.limit : 20;

    models.Train.findAndCountAll({
        limit: limit,
        offset: req.body.offset,

    }).then((result) => {
        res.send({
            list: result.rows,
            count: result.count,
        })
    })
});

router.delete('/trains/:id', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Train.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.send();
    });
});

router.post('/trains/add', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    if (!data.type || !data.color) {
        res.send({ errorMessage: "Неуказан тип или цвет"});
        return;
    }

    models.Train.create({
        type: data.type,
        color: data.color,
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была добавлена"});
    })
});

router.post('/trains/edit', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    if (!data.type || !data.color) {
        res.send({ errorMessage: "Неуказан тип или цвет!"});
        return;
    }

    let train = await models.Train.findOne({ where: { id: data.id }});

    if (!train) {
        res.send({ errorMessage: `Поезд с id: ${data.id} не найден!`});
        return;
    }

    train.update({
        type: data.type,
        color: data.color,
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была обновлена!"});
    })

});

router.get('/trains/free', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Train.findAll({
        where: {
            compositionId: null,
        }
    }).then((result) => {
        res.send(result);
    })
});

module.exports = router;
