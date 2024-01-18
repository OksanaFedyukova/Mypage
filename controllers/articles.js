const Article = require('../models/article');
const { cloudinary } = require("../cloudinary");



module.exports.index = async (req, res) => {
    const articles = await Article.find({}).populate('popupText');
    res.render('articles/index', { articles })
}

module.exports.renderNewForm = (req, res) => {
    res.render('articles/new');
}

module.exports.createArticle = async (req, res, next) => {
   
    const article = new Article(req.body.article);
    article.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    article.author = req.user._id;
    await article.save();
    console.log(article);
    req.flash('success', 'Successfully made a new article!');
    res.redirect(`/articles/${article._id}`)
}

module.exports.showArticle = async (req, res,) => {
    const article = await Article.findById(req.params.id).populate('author');
    if (!article) {
        req.flash('error', 'Cannot find that article!');
        return res.redirect('/articles');
    }
    res.render('articles/show', { article });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const article = await article.findById(id)
    if (!article) {
        req.flash('error', 'Cannot find that article!');
        return res.redirect('/articles');
    }
    res.render('articles/edit', { article });
}

module.exports.updateArticle = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const article = await Article.findByIdAndUpdate(id, { ...req.body.article });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    article.images.push(...imgs);
    await article.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await article.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated article!');
    res.redirect(`/articles/${article._id}`)
}

module.exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted article')
    res.redirect('/articles');
}