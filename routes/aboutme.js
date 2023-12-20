const express = require('express');
const router = express.Router();
const aboutme = require('../controllers/aboutme');
const catchAsync = require('../utils/catchAsync');

//const Aboutme = require('../models/aboutme');

router.route('/')
    .get(catchAsync(aboutme.index))



module.exports = router;