const express = require('express');
const router = express.Router();
const contact = require('../controllers/contact');
const catchAsync = require('../utils/catchAsync');


router.route('/')
    .get(catchAsync(contact.index))



module.exports = router;