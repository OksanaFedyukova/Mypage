const { projectSchema } = require('./schemas.js');
const { articleSchema} = require('./schemas.js')
const ExpressError = require('./utils/ExpressError');
const Project = require('./models/project');
const Article = require('./models/project');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateProject = (req, res, next) => {
    const { error } = projectSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.validateArticle = (req, res, next) => {
    const { error } = articleSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


module.exports.isProjectAuthor = async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/projects/${id}`);
    }
    next();
}


module.exports.isArticleAuthor = async (req, res, next) => {
    const { id } = req.params;
    const article = await Article.findById(id);
 if (!article.author.equals(req.user._id)) {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect(`/articles/${id}`);
        }
        next();
    }
