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

const articleSchema = new Schema({
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
       
}, opts);


articleSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/articles/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});




module.exports = mongoose.model('article', articleSchema);