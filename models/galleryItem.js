const mongoose = require('mongoose')
const Schema = mongoose.Schema

const galleryItemSchema = new Schema({
    url: {
    type: String,
    required: true
    },
    articlename: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    brandname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {timestamps: true})

const GalleryItem = mongoose.model('DesignshopDB', galleryItemSchema)


module.exports= GalleryItem