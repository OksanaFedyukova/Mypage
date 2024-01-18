const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.projectSchema = Joi.object({
    project: Joi.object({
        title: Joi.string().required().escapeHTML(),
        dateVisited: Joi.string().required(),
        tags: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        linkDemo: Joi.string().uri().escapeHTML(),  
        linkGitHub: Joi.string().uri().escapeHTML() 
    }).required(),
    deleteImages: Joi.array()
});



module.exports.articleSchema = Joi.object({
    article: Joi.object({
        title: Joi.string().required().escapeHTML(),
        dateVisited: Joi.string().required(),
        tags: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

