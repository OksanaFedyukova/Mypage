const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const projectSchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   
    dateVisited: {
            type: Date,
            default: Date.now,
        },
     tags: [
            {
                type: String,
            },
        ],
        linkDemo: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
                },
                message: 'Invalid URL format for linkDemo'
            }
        },
        linkGitHub: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
                },
                message: 'Invalid URL format for linkGitHub'
            }
        }
}, opts);


projectSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/projects/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});




module.exports = mongoose.model('project', projectSchema);