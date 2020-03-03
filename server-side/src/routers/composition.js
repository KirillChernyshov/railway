const express = require('express');
const Composition = require('../models/composition.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/compositons', auth, async (req, res) => {

});


module.exports = router;
