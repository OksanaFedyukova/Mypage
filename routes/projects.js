const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Project = require('../models/project');

router.route('/')
    .get(catchAsync(projects.index))


router.get('/new', projects.renderNewForm)

router.route('/:id')
    .get(catchAsync(projects.showProject))
  




module.exports = router;