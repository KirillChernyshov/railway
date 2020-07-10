const express = require('express');
const models = require('../models/index.js');
const auth = require('../middleware/auth');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const router = express.Router();

router.post('/routes', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let limit = (req.body.limit) ? req.body.limit : 20;

    models.Route.findAndCountAll({
        limit: limit,
        offset: req.body.offset,
        include: [
            {
                model: models.Composition,
                as: "composition",
                //required: false,
            },
            {
                model: models.Station,
                as: "stations",
            }
        ],
        distinct: true,
    }).then((result) => {
        res.send({
            list: result.rows,
            count: result.count,
        })
    })
});

router.post('/routes/add', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    models.Route.create({
        name: data.name,
        startDate: data.startDate,
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.status(500).send({ errorMessage: "Запись не была добавлена"});
    })
});

router.delete('/routes/:id', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Route.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.send();
    });
});

router.post('/routes/edit', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let data = req.body.data;

    if (!data.startDate)
        data.startDate = null;
    /*if (!data.type || !data.color) {
        res.send({ errorMessage: "Неуказан тип или цвет!"});
        return;
    }*/

    let station = await models.Route.findOne({ where: { id: data.id }});

    if (!station) {
        res.send({ errorMessage: `Route с id: ${data.id} не найден!`});
        return;
    }

    station.update({
        name: data.name,
        startDate: data.startDate,
    }).then((result) => {
        res.send(result.dataValues);
    }).catch((e) => {
        console.log(e);
        res.send({ errorMessage: "Запись не была обновлена!"});
    })

});

router.post('/routes/update/composition/:id', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let compositionId = req.body.compositionId;

    models.Route.findByPk(req.params.id)
        .then(async (route) => {
            await route.setComposition(compositionId)
            res.send();
        }).catch((e) => {
            return res.status(500).send({errorMessage: "Что-то пошло не так"});
        });

});

router.post('/routes/update/stations/:id', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.status(400).send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let del = req.body.del.map(record => record.id);
    let add = req.body.add;//.map(record => record.id);

    models.Route.findByPk(req.params.id)
        .then(async (route) => {
            await route.removeStations(del);
            for (item of add) {
                let station = await models.Station.findByPk(item.id)
                if (station)
                    await route.addStation(station, { through: { order: item.order, time: item.time, delay: item.delay, dist: item.dist } })
            }

            res.send();
        }).catch((e) => {
            return res.status(500).send({errorMessage: "Что-то пошло не так"});
        });

});

router.get('/timetable', async (req, res) => {
    models.Route.findAll({
        where: {
            startDate: { [Op.ne]: null }
        },
        include: [
            {
                model: models.Station,
                as: "stations"
            },
            {
                model: models.Composition,
                as: "composition",
            }
        ]
    }).then((result) => {
        let list = result.filter((item) => {
            //console.log(item.composition);
            return item.stations.length > 1 && item.composition;
        });
        res.send(list);
    })
});

module.exports = router;
