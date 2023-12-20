const express = require('express');
const router = express.Router();
const skills = require('../controllers/skills');
const catchAsync = require('../utils/catchAsync');


router.route('/')
    .get(catchAsync(skills.index))



module.exports = router;