const express = require('express');
const router = express.Router();
const projects = require('../controllers/projects');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateProject } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Project = require('../models/project');

router.route('/')
    .get(catchAsync(projects.index))



module.exports = router;