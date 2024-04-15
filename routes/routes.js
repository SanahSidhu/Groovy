const express = require('express');
const router = express.Router();

router.get('', (req,res) => {
    res.render('index', {text: 'This is ejs' })
})

router.get('/about', (req,res) => {
    res.render('about', {text: 'About page' })
})

module.exports = router;
