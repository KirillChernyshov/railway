const express = require('express');

const router = express.Router();

router.post('/user/login', (req, res) => {
    console.log(req.body);
    res.send({ msg: "Success"});
});

module.exports = router;
