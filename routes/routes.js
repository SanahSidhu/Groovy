const express = require('express');
const router = express.Router();

const {home, discover}  = require('./api.js');

router.get('/', home);

router.get('/discover', discover)

module.exports = router;
