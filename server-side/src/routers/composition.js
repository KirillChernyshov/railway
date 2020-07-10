const express = require('express');
const models = require('../models/index.js')
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/compositions', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let limit = (req.body.limit) ? req.body.limit : 20;

    models.Composition.findAll({
        limit: limit,
        offset: req.body.offset,
        include: [
            {
                model: models.Train,
                as: "Trains",
                required: false,
            },
            {
                model: models.Carriage,
                as: "Carriages",
                required: false,
            },
        ]

    }).then((result) => {
        models.Composition.count()
        .then(c => {
            res.send({
                list: result,
                count: c
            })
        });
    });
});

router.post('/compositions/add', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Composition.create().then((result) => {
        res.send();
    }).catch((e) => {
        console.log(e);
        res.status(500).send({ errorMessage: "Запись не была добавлена"});
    })
});

router.post('/compositions/update/trains/:id', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let del = req.body.del.map(record => record.id);
    let add = req.body.add.map(record => record.id);

    models.Composition.findByPk(req.params.id)
        .then(async (composition) => {
            await composition.removeTrains(del);
            await composition.addTrains(add);
            res.send();
        }).catch((e) => {
            return res.status(500).send({errorMessage: "Что-то пошло не так"});
        });
});

router.post('/compositions/update/carriages/:id', auth, async (req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    let del = req.body.del.map(record => record.id);
    let add = req.body.add.map(record => record.id);

    models.Composition.findByPk(req.params.id)
        .then(async (composition) => {
            await composition.removeCarriages(del);
            await composition.addCarriages(add);
            res.send();
        }).catch((e) => {
            return res.status(500).send({errorMessage: "Что-то пошло не так"});
        });

});

router.get('/compositions/free', auth, async(req, res) => {
    if (req.user.role != 10) {
        res.send({ errorMessage: "Недостаточно прав!" });
        return;
    }

    models.Composition.findAll({
        where: {
            routeId: null,
        },
        include: [
            {
                model: models.Train,
                as: "Trains",
                required: false,
            },
            {
                model: models.Carriage,
                as: "Carriages",
                required: false,
            },
        ]
    }).then((result) => {
        res.send(result);
    })
});

module.exports = router;
