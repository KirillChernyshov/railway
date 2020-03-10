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


module.exports = router;
