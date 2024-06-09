const express = require('express');
const router = express.Router();
const articles = require('../controllers/articles');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isArticleAuthor, validateArticle } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Article = require('../models/article');

router.route('/')
    .get(catchAsync(articles.index))
    .post(isLoggedIn, upload.array('image'), validateArticle, catchAsync(articles.createArticle))


router.get('/new', isLoggedIn, articles.renderNewForm)

router.route('/:id')
    .get(catchAsync(articles.showArticle))
    .put(isLoggedIn, isArticleAuthor, upload.array('image'), validateArticle, catchAsync(articles.updateArticle))
    .delete(isLoggedIn, isArticleAuthor, catchAsync(articles.deleteArticle));

router.get('/:id/edit', isLoggedIn, isArticleAuthor, catchAsync(articles.renderEditForm))



module.exports = router;