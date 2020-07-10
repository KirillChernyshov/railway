const express = require('express');
const models = require('../models/index.js');
const auth = require('../middleware/auth');
const Sequelize = require("sequelize");

const router = express.Router();

router.post('/stations', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let limit = (req.body.limit) ? req.body.limit : 20;

    models.Station.findAndCountAll({
        limit: limit,
        offset: req.body.offset,

    }).then((result) => {
        res.send({
            list: result.rows,
            count: result.count,
        })
    })
});

router.delete('/stations/:id', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Station.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.send();
    });
});

router.post('/stations/add', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    if (!data.name || !data.city) {
        res.status(400).send({ errorMessage: "Неуказано имя или город"});
        return;
    }

    models.Station.create({
        name: data.name,
        city: data.city,
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была добавлена"});
    })
});

router.post('/stations/edit', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    /*if (!data.type || !data.color) {
        res.send({ errorMessage: "Неуказан тип или цвет!"});
        return;
    }*/

    let station = await models.Station.findOne({ where: { id: data.id }});

    if (!station) {
        res.send({ errorMessage: `Станция с id: ${data.id} не найдена!`});
        return;
    }

    station.update({
        name: data.name,
        city: data.city,
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была обновлена!"});
    })

});

module.exports = router;
