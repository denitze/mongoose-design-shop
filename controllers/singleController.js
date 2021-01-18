const GalleryItem = require('../models/galleryItem')

const single_index_get = (req, res) => {
    console.log(req.params.pictureId);
    GalleryItem.findById(req.params.pictureId)
    .then(result => {
        res.render('single', {picture: result})
    })
    .catch(err => console.log(err))
    }


const single_delete =  (req, res) => {
    GalleryItem.findByIdAndDelete(req.params.pictureId)
    .then(result => res.redirect('/'))
    .catch(err => console.log(err))
}

const single_edit_post = (req, res) => {
    console.log(req.body)
    GalleryItem.findByIdAndUpdate(req.params.pictureId, req.body)
    .then(result => res.redirect(`/single/${req.params.pictureId}`))
    .catch(err => console.log(err))
}

module.exports = {
    single_index_get,
    single_delete,
    single_edit_post
}