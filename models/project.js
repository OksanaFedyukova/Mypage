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

const ProjectSchema = new Schema({
    title: String,
    images: [ImageSchema],
  
    price: Number,
    description: String,
    location: String,
   
    
}, opts);


ProjectSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/projects/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});



ProjectSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Project', ProjectSchema);