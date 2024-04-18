const express = require('express');
const router = express.Router();

const {home, discover, details, search}  = require('./api.js');

router.get('/', home);

router.get('/discover', discover)

router.get('/details/:id', details);

router.get('/search', search);

module.exports = router;
