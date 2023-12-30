const express = require('express');
const router = express.Router();
const aboutme = require('../controllers/aboutme');
const catchAsync = require('../utils/catchAsync');


router.route('/')
    .get(catchAsync(aboutme.index))



module.exports = router;