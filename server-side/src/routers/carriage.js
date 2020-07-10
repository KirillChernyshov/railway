const express = require('express');
const models = require('../models/index.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/carriages', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let limit = (req.body.limit) ? req.body.limit : 20;

    models.Carriage.findAndCountAll({
        limit: limit,
        offset: req.body.offset,

    }).then((result) => {
        res.send({
            list: result.rows,
            count: result.count,
        })
    })
});

router.delete('/carriages/:id', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Carriage.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.send();
    });
});

router.post('/carriages/add', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    if (!data.type || !data.color) {
        res.send({ errorMessage: "Неуказан тип или цвет!"});
        return;
    } else if (parseInt(data.seats) < 0) {
        res.send({ errorMessage: "Кол-во мест не должно быть меньше нуля!"});
        return;
    }

    models.Carriage.create({
        type: data.type,
        color: data.color,
        seats: parseInt(data.seats),
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была добавлена"});
    })
});

router.post('/carriages/edit', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    if (!data.type || !data.color) {
        res.send({ errorMessage: "Неуказан тип или цвет!"});
        return;
    } else if (parseInt(data.seats) < 0) {
        res.send({ errorMessage: "Кол-во мест не должно быть меньше нуля!"});
        return;
    }

    let carriage = await models.Carriage.findOne({ where: { id: data.id }});

    if (!carriage) {
        res.send({ errorMessage: `Вагон с id: ${data.id} не найден!`});
        return;
    }

    carriage.update({
        type: data.type,
        color: data.color,
        seats: parseInt(data.seats),
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была обновлена!"});
    })

});

router.get('/carriages/free', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Carriage.findAll({
        where: {
            compositionId: null,
        }
    }).then((result) => {
        res.send(result);
    })
});

module.exports = router;
