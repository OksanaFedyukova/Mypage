const express = require('express');
const router = express.Router();
const blog = require('../controllers/blog');
const catchAsync = require('../utils/catchAsync');


router.route('/')
    .get(catchAsync(blog.index))



module.exports = router;